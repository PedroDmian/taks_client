import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from '@nativescript/core/application-settings';

import { SharedAppService } from '../../services/shared-app.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
	moduleId: module.id,
	selector: 'ns-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	public User : User;

	public Request : any = {
		show: false,
		error: true,
		message: 'Error',
		code: 400
	};

	public viewLogin : boolean = false;

	constructor(private authService : AuthService, private router : RouterExtensions, private shared : SharedAppService) { 
		this.User = new User('', '', 'damian.palomo@outlook.es', '123456789', '', '', '', 1);
	}

	ngOnInit(): void {
		if(ApplicationSettings.getBoolean("authenticated", false) && (ApplicationSettings.getString("token") != '' || ApplicationSettings.getString("token") != null)) {
			this.router.navigate(["/dashboard"], { clearHistory: true });
		}

		this.viewLogin = true;
	}

	onLogin() {
		let email	 = this.User.email;
		let password = this.User.password;

		this.Request = {show : false};

		if(email && password) {
			this.authService.SignUp(email, password).subscribe(response => {
				let bodyResponse : any = response;

				this.Request.error   = false;
				this.Request.code	 = 200;
				this.Request.message = bodyResponse.message;

				this.shared.MessageShow('success', this.Request.message);

				ApplicationSettings.setBoolean("authenticated", true);
				ApplicationSettings.setString("token", bodyResponse.data.token);
				
				this.router.navigate(["/dashboard"], { clearHistory: true });
			}, error => {
				let bodyError = error.error;

				this.Request.error   = true;
				this.Request.code	 = error.status;
				this.Request.message = bodyError.message;

				this.shared.MessageShow('error', this.Request.message);
			});
		} else {
			this.Request.error   = true;
			this.Request.message = "Error, es necesario todos los datos";

			this.shared.MessageShow('warning', this.Request.message);
		}
	}
}
