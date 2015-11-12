var transformTools = require( 'browserify-transform-tools' );
var compileLess = require( './compile-less' );

var options = {
  includeExtensions: [
    '.css',
    '.less',
    '.lessm'
  ]
};
var transformExclude = require( 'browserify-transform-tools-exclude' );

module.exports = function ( fileName, opts ) {
  var stream;
  var fnTransform = transformExclude( function ( content, transformOptions, done ) {
    var file = transformOptions.file;
    try {
      compileLess( {
        content: content,
        file: file,
        stream: stream,
        config: transformOptions.config
      }, done );
      return;
    } catch (ex) {
      done( ex );
    }

    done( null, content );
  } );

  opts = opts || { };

  var fn = transformTools.makeStringTransform( 'simplessy', options, fnTransform ).configure( opts.config );

  stream = fn( fileName, opts );

  return stream;
};
