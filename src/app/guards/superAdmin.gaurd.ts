import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class SuperAdminGaurd implements CanActivate {
	constructor(private readonly router: Router) {}

	canActivate( ): boolean {
        let payload:any = JSON.parse(localStorage.getItem('payload'));
        if(payload.RoleId == 1){
            // super Admin 
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;
        }
	}
}
