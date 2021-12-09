import { TestBed, async, inject } from '@angular/core/testing';

import { UnAuthGuardGuard } from './un-auth-guard.guard';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: '',
	template: ''
})
class LoginComponent {}

const routes: Routes = [ { path: '', component: LoginComponent } ];

describe('UnAuthGuardGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			imports: [ RouterModule.forRoot(routes), HttpClientModule, MatDialogModule ],
			providers: [ UnAuthGuardGuard ]
		});
	});

	it(
		'should ...',
		inject([ UnAuthGuardGuard ], (guard: UnAuthGuardGuard) => {
			expect(guard).toBeTruthy();
		})
	);
});
