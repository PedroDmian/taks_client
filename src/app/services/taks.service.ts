import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Taks } from '../models/taks';
import { GLOBAL } from './global';

import { SharedAppService  } from '../services/shared-app.service';

@Injectable({
	providedIn: 'root'
})
export class TaksService {

	public url: string;
	public token : string;

	constructor(private _http : HttpClient, private shared : SharedAppService) {
		this.url = GLOBAL.url;
		this.token = this.shared.getToken();
  	}
  
  	public get() {
		const url = `${this.url}taks`;

		return this._http.get(url, { headers: this.headers() }).pipe(map(data => data));
	}

	public save(taksData : Object) {
		const url = `${this.url}taks/save`;
		
		return this._http.post<Taks>(url, taksData, { headers: this.headers() }).pipe(map(data => data));
	}

	public update(taksData : Object) {
		const url = `${this.url}taks/update`;

		return this._http.put<Taks>(url, taksData, { headers: this.headers() }).pipe(map(data => data));
	}

	public delete(id : string) {
		const url = `${this.url}taks/delete/${id}`;

		return this._http.delete(url, { headers: this.headers() }).pipe(map(data => data));
	}

	public headers() {
		return new HttpHeaders({
			'Content-Type' : 'application/json',
			'Authorization': this.token,
			'observe' : "response"
		});
	}
}
