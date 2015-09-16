var ES6Promise = require( 'es6-promise' ).Promise;
var Core = require( 'css-modules-loader-core' );
var FileSystemLoader = require( 'css-modules-loader-core/lib/file-system-loader' );
var extend = require( 'extend' );
var stringHash = require( 'string-hash' );
var path = require( 'path' );
/*
  Custom `generateScopedName` function for `postcss-modules-scope`.
  Appends a hash of the css source.
*/
function createScopedNameFunc( plugin ) {
  var orig = plugin.generateScopedName;

  return function ( name, _path, css ) {
    return 'c_' + stringHash( css ).toString( 36 ).substr( 0, 5 ) + '_' + stringHash( orig.apply( plugin, arguments ) ) + '_' + name; //+ '___' + hash;
  };
}

// keep track of all tokens so we can avoid duplicates
var tokensByFile = { };

module.exports = function ( css, filename, opts ) {
  var options = opts || { };
  var parseTokens = options.tokens || !!filename.match( /\.m\.less$/ );
  if ( !parseTokens ) {
    return ES6Promise.resolve( { finalSource: css, tokens: {} } );
  }

  var rootDir = options.rootDir || options.d || '/';

  // PostCSS plugins passed to FileSystemLoader
  var plugins = options.use || options.u;
  if ( !plugins ) {
    plugins = Core.defaultPlugins;

    var pmodulesScope = plugins.filter( function ( plugin ) {
      return plugin.postcss.postcssPlugin === 'postcss-modules-scope';
    } );

    if ( pmodulesScope.length > 0 ) {
      pmodulesScope = pmodulesScope[ 0 ];
      pmodulesScope.generateScopedName = createScopedNameFunc( pmodulesScope );
    }

  } else {
    if ( typeof plugins === 'string' ) {
      plugins = [ plugins ];
    }

    plugins = plugins.map( function requirePlugin( name ) {
      // assume functions are already required plugins
      if ( typeof name === 'function' ) {
        return name;
      }

      var plugin = require( require.resolve( name ) );

      // custom scoped name generation
      if ( name === 'postcss-modules-scope' ) {

        options[ name ] = options[ name ] || { };
        if ( !options[ name ].generateScopedName ) {
          options[ name ].generateScopedName = createScopedNameFunc( plugin );
        }
      }

      if ( name in options ) {
        plugin = plugin( options[ name ] );
      } else {
        plugin = plugin.postcss || plugin();
      }

      return plugin;
    } );
  }

  return new ES6Promise( function ( resolve, reject ) {

    var loader = new FileSystemLoader( rootDir, plugins );

    loader.tokensByFile = tokensByFile;

    var fPath = path.relative( rootDir, filename );

    loader.fetch( fPath, '/', null, css ).then( function ( tokens ) {

      extend( tokensByFile, loader.tokensByFile );

      resolve( { finalSource: loader.finalSource, tokens: tokens } );

    }, reject );
  } );
};
