import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class OperationGaurd implements CanActivate {
	constructor(private readonly router: Router) {}

	canActivate( ): boolean {
        let payload:any = JSON.parse(localStorage.getItem('payload'));
        if(payload.RoleId == 1 || payload.RoleId == 2 || payload.RoleId == 7){
            // super Admin company Admin
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;
        }
	}
}
