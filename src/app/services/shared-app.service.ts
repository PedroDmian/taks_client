import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from '@nativescript/core/application-settings';
import { SnackBar, SnackBarOptions } from '@nstudio/nativescript-snackbar';

import { Base64Service } from './base64.service';

@Injectable({
	providedIn: 'root'
})

export class SharedAppService {
	public  snackbar = new SnackBar();

	constructor(private router : RouterExtensions, private base64Svce : Base64Service) { }

	public logout() {
		// ? Remove Token and Authenticted
		ApplicationSettings.remove("authenticated");
		ApplicationSettings.remove("token");
		
		this.MessageShow('200', 'Sesión Cerrada');
		this.router.navigate(["/login"], { clearHistory: true });
	}

	public VerifySession(code : number, message: string = '') {
		switch(code){
			case 401:
				// ! Token Invalido
				this.MessageShow('danger', 'Tu sesión ha expirado');
				this.logout();
				break;
			default:
				this.MessageShow('warning', message);
				break;
		}
	}

	public MessageShow(status : string, message : string) {
		let colorBackground = '#212121';
		let colorText		= '#ffffff';

		console.log(status);

		switch(status) {
			case 'success':
				colorBackground = '#1BC5BD';
				break;
			case 'warning':
				colorBackground = '#FFA800';
				colorText = '#000000';
				break;
			case 'error':
				colorBackground = '#F64E60';
				break;
			case 'log':
				colorBackground = '#8950FC';
				break;
		}

		this.snackbar.simple(message, colorText, colorBackground);
	}

	public GetUserData() {
		if(!ApplicationSettings.getBoolean("authenticated", false) && (ApplicationSettings.getString("token") == '' || ApplicationSettings.getString("token") == null)) {
			this.VerifySession(401);

			return 0;
		} else {
			let token     = ApplicationSettings.getString("token");
			let base64Url = token.split('.')[1];
			let base64    = base64Url.replace('-', '+').replace('_', '/');

			return this.base64Svce.decode(base64);
		}
	}

	public getToken() {
		return ApplicationSettings.getString("token");
	}

	
}
