import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule as Angular4WebpackApp } from "./app";

let isProd: boolean = false;

if ( isProd ) {
	enableProdMode();
}

export const Boot = () => {
	return platformBrowserDynamic().bootstrapModule( Angular4WebpackApp ).then( () => {

	}, error => {
		console.error.bind( console, error );
	});
};

( document.readyState === "complete" ) ? Boot() : document.addEventListener( "DOMContentLoaded", Boot );