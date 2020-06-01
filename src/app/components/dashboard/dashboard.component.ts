import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from '@nativescript/core/application-settings';
import { Page } from "tns-core-modules/ui/page";
import { Observable } from 'rxjs';

import { SharedAppService } from '../../services/shared-app.service';
import { TaksService } from '../../services/taks.service';

import { Taks } from '../../models/taks';

@Component({
	selector: 'ns-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	public NumberTaks : number = 0;
	public TaksList : Observable<Taks[]>;

	public UserData : Object = [];

	constructor(private router : RouterExtensions, private shared : SharedAppService, private PageUIX : Page, private taksService : TaksService) { }

	ngOnInit(): void {
		if(!ApplicationSettings.getBoolean("authenticated", false) && (ApplicationSettings.getString("token") == '' || ApplicationSettings.getString("token") == null)) {
			this.router.navigate(["/login"], { clearHistory: true });
		} else {
			let SharedGetUserData = this.shared.GetUserData();

			this.UserData = SharedGetUserData;
		}

		this.PageUIX.actionBarHidden = true;
		this.getTaks();
	}

	get placeholderImage(): string {
		//return `res://tasks_complete_${NSDate.isDayTime() ? 'day' : 'night'}`;
		return 'https://cdn.memegenerator.es/imagenes/memes/full/30/45/30456812.jpg';
    }
	
	public getTaks() {
		this.taksService.get().subscribe((response : any) => {
			let data : any = response.data;

			this.NumberTaks = data.length;
			this.TaksList	= data;
		}, error => {
			let bodyError = error.error;
			this.shared.VerifySession(error.status, bodyError.message);
		});
	}

	public onItemTap(event) {
		console.log(event);
	}

	public displayForm() {
		this.router.navigate(["/new_taks"], { clearHistory: true });	
	}

	public delete_taks(id : string) {
		this.taksService.delete(id).subscribe((response : any) => {
			let BodyResponse = response.data;

			this.shared.MessageShow('success', response.message);

			this.getTaks();
		}, error => {
			let bodyError = error.error;
			this.shared.VerifySession(error.status, bodyError.message);
		});
	}

	logout() {
		this.shared.logout();
	}
}
