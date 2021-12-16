import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyMandatesPage } from './my-mandates.page';

const routes: Routes = [
	{
		path: '',
		component: MyMandatesPage
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
	declarations: [MyMandatesPage]
})
export class MyMandatesPageModule { }
