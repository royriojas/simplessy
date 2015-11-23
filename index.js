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

    compileLess( {
      content: content,
      file: file,
      stream: stream,
      config: transformOptions.config
    } ).then( function ( result ) {
      done( null, result );
    } ).catch( function ( err ) {
      done( err );
    } );

  } );

  opts = opts || { };

  var fn = transformTools.makeStringTransform( 'simplessy', options, fnTransform ).configure( opts.config );

  stream = fn( fileName, opts );

  return stream;
};
