import "core-js/client/shim";
import "reflect-metadata";
import "zone.js/dist/zone.js";

const isProd: boolean = false;

if ( isProd ) {

} else {
	Error[ "stackTraceLimit" ] = Infinity;
}