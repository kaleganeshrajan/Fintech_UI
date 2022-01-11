import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'master-settings',
		loadChildren: './payment-settings/master-settings/master-settings.module#MasterSettingsPageModule',

	},
	{
		path: 'distributor-settings',
		loadChildren: './payment-settings/distributor-settings/distributor-settings.module#DistributorSettingsPageModule',

	},
	{
		path: 'company-settings',
		loadChildren: './payment-settings/company-settings/company-settings.module#CompanySettingsPageModule',

	},
	{
		path: 'add-lead',
		loadChildren: './payment-settings/add-lead/add-lead.module#AddLeadPageModule'		

	},
	{
		path: 'make-payment',
		loadChildren: './payment-settings/make-payment/make-payment.module#MakePaymentPageModule'
	},
	{
		path: 'scheduled-payment',
		loadChildren: './payment-settings/scheduled-payment/scheduled-payment.module#ScheduledPaymentPageModule',

	},
	{
		path: 'my-mandates',
		loadChildren: './payment-settings/my-mandates/my-mandates.module#MyMandatesPageModule'
	},
	{
		path: 'payment-history',
		loadChildren: './payment-settings/payment-history/payment-history.module#PaymentHistoryPageModule',

	},
];


@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			useHash: true
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
