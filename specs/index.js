describe( 'simplessy', function () {
  var read = function ( path ) {
    return require( 'fs' ).readFileSync( path, { encoding: 'utf8' } );
  };

  it( 'should make less modules requireable', function ( done ) {
    var expected = read( 'test/expected-output.txt' );
    var spawnly = require( 'spawnly' );

    var cp = spawnly( 'npm run bundle --silent' );
    var result = '';
    cp.stdout.on( 'data', function ( data ) {
      result += data;
    } );


    cp.on( 'exit', function () {

      expect( result ).to.equal( expected );
      done();
    } );

  } );
} );
