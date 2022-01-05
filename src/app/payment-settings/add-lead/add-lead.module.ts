import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddLeadPage } from './add-lead.page';
import { IonicSelectableModule } from 'ionic-selectable';


const routes: Routes = [
	{
		path: '',
		component: AddLeadPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		IonicSelectableModule
	],
	declarations: [AddLeadPage]
})
export class AddLeadPageModule { }
