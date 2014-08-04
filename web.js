/* Simple Express Server */

var express = require( 'express' );
var favicon = require( 'serve-favicon' );
var logfmt = require( 'logfmt' );
var compression = require( 'compression' );

var app = express();
app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( logfmt.requestLogger() );
app.use( compression() );
app.use( express.static( __dirname + '/public' ) );

var port = Number( process.env.PORT || 8300 );
app.listen( port,
            function( )
            {
                console.log( "Listening on port " + port );
            } );

