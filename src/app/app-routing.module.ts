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
