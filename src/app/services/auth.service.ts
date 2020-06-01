import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	public url: string;

	public headers : HttpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
		'Authorization' : '',
		'observe' : "response"
	});

	constructor(private _http : HttpClient) {
		this.url = GLOBAL.url;
	}

	public SignUp(email: string, password: string) {
		const url = `${this.url}login`;

		return this._http.post<User>(url, { email, password }, { headers: this.headers }).pipe(map(data => data));
	}

}
