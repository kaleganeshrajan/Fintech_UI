import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

import { IonicModule } from '@ionic/angular';
import { ProgressBarModule } from 'angular-progress-bar';

import { HomePage } from './home.page';
import { ShowEConsentComponent } from "../home/show_econsent-msg.component";

const routes: Routes = [
	{
		path: '',
		component: HomePage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProgressBarModule,
		NgxEchartsModule,
		RouterModule.forChild(routes)
	],
	declarations: [ HomePage, ShowEConsentComponent ],
	entryComponents: [ShowEConsentComponent]

})
export class HomePageModule {}
