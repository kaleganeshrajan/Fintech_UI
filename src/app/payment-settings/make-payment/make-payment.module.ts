import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MakePaymentPage } from './make-payment.page';
import { CodeInputModule } from 'angular-code-input';

const routes: Routes = [
	{
		path: '',
		component: MakePaymentPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		CodeInputModule.forRoot({
			codeLength: 4,
			isCharsCode: false,
			isCodeHidden: false
		  }),
	],
	declarations: [MakePaymentPage]
})
export class MakePaymentPageModule { }
