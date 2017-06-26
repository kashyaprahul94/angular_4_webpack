import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { RoutingModule, RoutingProviders } from "./routing";


import { Base as BaseComponent } from "./components/base";
import { Home as HomeComponent } from "./components/home";


@NgModule({
	imports: [

		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,

		RoutingModule,
	],
	declarations: [
		BaseComponent,
		HomeComponent
	],
	providers: [
		RoutingProviders
	],
	bootstrap: [
		BaseComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule {

}