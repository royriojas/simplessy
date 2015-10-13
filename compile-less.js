module.exports = function ( args, done ) {

  var file = args.file;
  var stream = args.stream;
  var config = args.config;

  var compileLess = require( 'simpless/lib/compile-less' );
  var autoPrefix = require( 'simpless/lib/autoprefix' );
  var getTokens = require( './get-tokens' );
  var stringHash = require( 'string-hash' );

  var hash = 'style_' + stringHash( file ).toString( 36 ).substr( 0, 5 );

  compileLess( file, { compress: true } ).then( function ( result ) {
    return autoPrefix( result.css, {
      file: file,
      dest: '',
      autoprefixer: {
        browsers: [
          'last 2 versions'
        ]
      }
    } ).then( function ( compiled ) {

      compiled = compiled.replace( /\\/g, '\\\\' ).replace( /'/g, '\\$&' ).replace( /"/g, '\\$&' );

      getTokens( compiled, file, config ).then( function ( response ) {
        var tokens = response.tokens;
        compiled = response.finalSource;

        var renderCSS = function renderCSS( styles, id ) {
          var doc = global.document;
          if ( doc ) {
            var style = doc.querySelector( '#' + id );
            if ( !style ) {
              style = doc.createElement( 'style' );
              style.setAttribute( 'id', id );
              style.type = 'text/css';
            }
            if ( style.styleSheet ) {
              style.styleSheet.cssText = styles;
            } else {
              style.innerHTML = '';
              style.appendChild( document.createTextNode( styles ) );
            }
            var head = doc.querySelector( 'head' );
            head.appendChild( style );
          }
        };

        // be careful here, this function is defined like this
        // for ease of use, but this is going to actually be serialized inside
        // the output of the transform
        // so tokens inside this function, refer to the tokens
        // variable declared in the transformed code
        var fn = function _getToken( /*klass, klass1, klass2*/ ) {

          if ( !tokens ) {
            throw new Error( 'no tokens found' );
          }

          var _args = [ ].slice.call( arguments ).join( ' ' ).split( ' ' );

          var _result = _args.map( function ( klass ) {

            var token = tokens[ klass ];
            if ( !token ) {
              throw new Error( 'no token found for ' + klass );
            }
            return token;
          } ).join( ' ' );

          return _result;
        };

        compiled = 'var css = "' + compiled + '";';
        compiled += '\n\nvar hash = "' + hash + '";';
        compiled += '\n\nvar doRender = function () { (' + renderCSS.toString() + ')(css, hash) };';
        compiled += '\n\nvar tokens = ' + JSON.stringify( tokens );
        compiled += '\n\nvar fn = ' + fn.toString();
        compiled += '\n\ndoRender();';
        compiled += '\n\n' + 'module.exports = { css: css, tokens: tokens, t: fn, render: function () { doRender(); }}\n\n';

        var imports = result.imports || [ ];

        imports.forEach( function ( _file ) {
          stream.emit( 'file', _file );
        } );

        done( null, compiled );
      } );
    } );
  }, function ( err ) {
    done( err );
  } );
};
