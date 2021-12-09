import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: 'app-signin',
	template: ''
})
class LoginComponent {}

@Component({
	selector: 'app-dashboard',
	template: ''
})
class DashboardComponent {}

const routes: Routes = [ { path: '', component: LoginComponent } ];

describe('AuthGuardGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			providers: [ AuthGuardGuard ],
			imports: [ HttpClientModule, RouterModule.forRoot(routes), MatDialogModule ]
		});
	});

	it(
		'should ...',
		inject([ AuthGuardGuard ], (guard: AuthGuardGuard) => {
			expect(guard).toBeTruthy();
		})
	);
});
