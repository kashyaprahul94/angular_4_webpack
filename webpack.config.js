const Env = process.env.NODE_ENV;

if ( Env === "prod" || Env === "production" ) {
	module.exports = require( "./config/webpack/prod" )({
		env: "production"
	});
} else {
	module.exports = require( "./config/webpack/dev" )({
		env: "development"
	});
}