require( "core-js/es6" );
require( "core-js/es6/reflect" );
require( "reflect-metadata" );
require( "zone.js/dist/zone" );
require( "zone.js/dist/long-stack-trace-zone" );

const isProd: boolean = false;

if ( isProd ) {

} else {
	Error[ "stackTraceLimit" ] = Infinity;
}