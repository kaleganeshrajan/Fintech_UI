import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScheduledPaymentPage } from './scheduled-payment.page';

const routes: Routes = [
	{
		path: '',
		component: ScheduledPaymentPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	declarations: [ScheduledPaymentPage]
})
export class ScheduledPaymentPageModule { }
