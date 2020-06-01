import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
	providedIn: 'root'
})

export class UserService {

	public url: string;

	public headers : HttpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
		'Authorization' : '',
		'observe' : "response"
	});

	constructor(private _http : HttpClient) {
		this.url = GLOBAL.url;
  	}
  
  	public get() {
		const url = `${this.url}users`;

		return this._http.get(url, { headers: this.headers }).pipe(map(data => data));
	}

	public save(userData : Object) {
		const url = `${this.url}users/save`;

		return this._http.post<User>(url, userData, { headers: this.headers }).pipe(map(data => data));
	}

	public update(userData : Object) {
		const url = `${this.url}users/update`;

		return this._http.put<User>(url, userData, { headers: this.headers }).pipe(map(data => data));
	}

	public delete(id : string) {
		const url = `${this.url}users/delete/${id}`;

		return this._http.delete(url, { headers: this.headers }).pipe(map(data => data));
	}
}
