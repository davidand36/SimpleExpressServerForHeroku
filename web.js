/* Simple Express Server */

var express = require( 'express' );
var favicon = require( 'serve-favicon' );
var logfmt = require( 'logfmt' );
var compression = require( 'compression' );

var app = express();

// These functions gather and echo data posted from the client (if any).
// That is good for experimenting with forms, AJAX, etc.
// For more useful form handling, particularly parsing of field values,
// use something like https://www.npmjs.org/package/body
// or https://github.com/expressjs/body-parser.

function getRequestData( req, res, next )
{
    req.setEncoding( 'utf8' );
    req.data = '';
    req.on( 'data',
            function( chunk )
            {
                req.data += chunk;
            } );
    req.on( 'end', next );
}

function echoRequestData( req, res, next )
{
    res.setHeader( 'content-type', 'text/plain' );
    res.end( req.data );
    console.log( 'Request data: ' + req.data );
}

app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( logfmt.requestLogger() );
app.use( compression() );
app.use( getRequestData );
app.use( express.static( __dirname + '/public' ) );
app.use( echoRequestData );

var port = Number( process.env.PORT || 8300 );
app.listen( port,
            function( )
            {
                console.log( "Listening on port " + port );
            } );

