import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DistributorSettingsPage } from './distributor-settings.page';

const routes: Routes = [
	{
		path: '',
		component: DistributorSettingsPage
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
	declarations: [DistributorSettingsPage]
})
export class DistributorSettingsPageModule { }
