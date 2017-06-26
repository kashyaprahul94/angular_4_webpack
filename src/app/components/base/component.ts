import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Http } from "@angular/http";

@Component({
	selector: "[angular_4_webpack]",
	templateUrl: "templates/base.html",
	styleUrls: [
		"styles/base.scss"
	],
	encapsulation: ViewEncapsulation.None
})
export class Base implements OnInit, OnDestroy {

	constructor ( private http: Http ) {
		Base.initAppClients( this.http );
	}

	ngOnInit () {

	}

	ngOnDestroy () {

	}


	private static initAppClients ( http: Http ): void {

	}
}