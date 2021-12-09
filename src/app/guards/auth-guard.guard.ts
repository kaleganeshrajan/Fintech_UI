import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
	constructor(private readonly router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('payload') === null) {
			this.router.navigateByUrl('/login');
			return false;
		}
		return true;
	}
}
