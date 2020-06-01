import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from '@nativescript/core/application-settings';
import { Page } from "tns-core-modules/ui/page";

import { SharedAppService } from '../../services/shared-app.service';
import { TaksService } from '../../services/taks.service';

import { Taks } from '../../models/taks';

@Component({
	selector: 'ns-taks-form',
	templateUrl: './taks-form.component.html',
	styleUrls: ['./taks-form.component.css']
})

export class TaksFormComponent implements OnInit {
	public Taks : Taks;	
	public UserData : Object = [];

	public submitted = false;

	constructor(private router : RouterExtensions, private shared : SharedAppService, private PageUIX : Page, private taksService : TaksService) {
		this.Taks = new Taks('', '', '', '', '', 1);
	}

	ngOnInit(): void {
		if(!ApplicationSettings.getBoolean("authenticated", false) && (ApplicationSettings.getString("token") == '' || ApplicationSettings.getString("token") == null)) {
			this.router.navigate(["/login"], { clearHistory: true });
		} else {
			let SharedGetUserData = this.shared.GetUserData();

			this.UserData = SharedGetUserData;
		}

		this.PageUIX.actionBarHidden = true;
	}

	save() {
		let name = this.Taks.name;
		let description = this.Taks.description;

		if(name) {
			this.taksService.save(this.Taks).subscribe((response : any) => {
				let BodyResponse = response.data;

				this.shared.MessageShow('success', response.message);

				this.Taks = new Taks('', '', '', '', '', 1);

				this.router.navigate(["/"], { clearHistory: true });
			}, error => {
				let bodyError = error.error;
				this.shared.VerifySession(error.status, bodyError.message);
			});
		} else {
			this.shared.MessageShow('warning', 'EL nombre de la tarea es necesario.');
		}
	}

	cancel() {
		this.router.navigate(["/"], { clearHistory: true });
	}
}
