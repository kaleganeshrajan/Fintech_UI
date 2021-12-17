import { AlertController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlertDialogs {
	constructor(public alertCtrl: AlertController, public navCtrl: NavController) {}

	// Close window on click success
	async successAlert(headerTxt: any, msg: any) {
		debugger
		const alert = await this.alertCtrl.create({
			header: headerTxt,
			message: msg,
			backdropDismiss: false,
			buttons: [
				{
					cssClass: 'item-center',
					text: 'Ok',
					handler: async () => {
						this.navCtrl.back();
					}
				}
			]
		});
		await alert.present();
	}

	// alert dialog
	async alertDialog(headerTxt: any, msg: any) {
		// if (this.alertCtrl.getTop()) {
		// 	this.alertCtrl.dismiss();
		// }
		const alert = await this.alertCtrl.create({
			header: headerTxt,
			message: msg,
			buttons: [ {
				cssClass: 'item-center',
				text: 'OK'
			} ]
		});

		await alert.present();
	}

	// alert dialog
	async alertDialogwithreload(headerTxt: any, msg: any) {
		// if (this.alertCtrl.getTop()) {
		// 	this.alertCtrl.dismiss();
		// }
		const alert = await this.alertCtrl.create({
			header: headerTxt,
			message: msg,
			buttons: [ {
				cssClass: 'item-center',
				text: 'OK',
				handler: async () => {
					window.location.reload();
				}
			} ]
		});

		await alert.present();
	}
}
