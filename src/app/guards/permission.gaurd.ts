import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PermissionGaurd implements CanActivate {
    constructor(private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const payload: any = JSON.parse(localStorage.getItem('payload'));
        const permissions = payload.permissions;
        const urlMap = {};
        for (const url of permissions) {
            urlMap[url.PageId] = url;
        }

        let checkUrl = '';
        if (route.url.length > 0) {
            for (const u of route.url) {
                checkUrl += '/' + u.path;
            }
        }

        if (urlMap[checkUrl]) {
            return true;
        } else {
            return false;
        }
    }
}
