import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utility } from '../utility/utility';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';



@Injectable({
	providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private utility: Utility) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		
		if (!window.navigator.onLine) {
			// if there is no internet, throw a HttpErrorResponse error
			// since an error is thrown, the function will terminate here
			let errorMessage = 'No internet';
			this.utility.presentToastWithOptions(
				errorMessage,
				'5000',
				null,
				'danger',
				null,
				true
			);

			return Observable.throw(new HttpErrorResponse({ error: errorMessage }));
		}
		const copiedReq = request
		// const copiedReq = request.clone({
		// 	withCredentials: true
		// });
		return next.handle(copiedReq).pipe( map((event: HttpEvent<any>) => {
			return event;
		})
		);
	}
}
