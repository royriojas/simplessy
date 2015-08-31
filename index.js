var transformTools = require( 'browserify-transform-tools' );
var compileLess = require( './compile-less' );

var options = {
  includeExtensions: [
    '.css',
    '.less'
  ]
};
var transformExclude = require( 'browserify-transform-tools-exclude' );

module.exports = function ( fileName, opts ) {
  var stream;
  var fnTransform = transformExclude( function ( content, transformOptions, done ) {
    var file = transformOptions.file;
    try {
      //compileLess( content, file, stream, done );
      compileLess( {
        conent: content,
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
  var fn = transformTools.makeStringTransform( 'simplessy', options, fnTransform );
  stream = fn( fileName, opts );
  return stream;
};
