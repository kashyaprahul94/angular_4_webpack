import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Base } from "./components/base";
import { Home } from "./components/home";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full"
	},
	{
		path: "home",
		component: Home
	},
	{
		path: "**",
		component: Home
	}
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot( routes, {
	useHash: true
});

export const RoutingProviders: any[] = [  ];