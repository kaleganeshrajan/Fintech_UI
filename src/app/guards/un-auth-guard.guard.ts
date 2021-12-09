import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UnAuthGuardGuard implements CanActivate {
	constructor(private readonly router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('payload') !== null) {
			this.router.navigateByUrl('/tabs');
			return false;
		}
		return true;
	}
}
