import { ModuleWithProviders } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";

import { Base } from "./components/base";
import { Home } from "./components/home";

const routes: any[] = [

	{
		name: "base",
		url: "/",
		views: {
			main: {

			}
		}
	},

	{
		name: "home",
		url: "/home",
		views: {
			main: {
				component: Home
			}
		}
	}
];

export const RoutingModule: ModuleWithProviders = UIRouterModule.forRoot({
	states: routes,
	useHash: false
});

export const RoutingProviders: any[] = [  ];