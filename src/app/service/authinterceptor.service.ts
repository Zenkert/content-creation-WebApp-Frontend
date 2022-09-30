import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

	constructor(private auth: GlobalService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add auth header with jwt if account is logged in and request is to the api url
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});
		// console.log(request.url)
		return next.handle(request);
	}
}

