import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DISABLED } from '@angular/forms/src/model';

@Injectable()
export class AlertBoxService {
	constructor(public alertCtrl: AlertController, public navCtrl: NavController) {}

	async presentAlert() {
		const alert = await this.alertCtrl.create({
			message: 'Confirm Verification Code',
			cssClass: 'prompt_alert',
			inputs: [
				{
					name: 'Number1',
					type: 'number',
					disabled: true,
					value: 8
				},
				{
					name: 'Number2',
					type: 'number',
					disabled: true,
					value: 2
				},
				{
					name: 'Number3',
					type: 'number',
					disabled: true,
					value: 6
				},
				{
					name: 'Number4',
					type: 'number',
					disabled: true,
					value: 0
				}
			],
			buttons: [
				{
					text: 'Re-send',
					cssClass: '.button-resend',
					handler: () => {
						console.log('Resend', '');
					}
				},
				{
					text: 'Ok',
					cssClass: 'button-ok',
					handler: (data) => {
						console.log(
							'Values',
							data.Number1,
							data.Number2,
							data.Number3,
							data.Number4
						);
						this.navCtrl.navigateRoot([ '/tabs' ]);
					}
				}
			]
		});

		await alert.present();
	}

	// Close window on click success
	// async alertDialog(headerTxt: string, msg: string) {

	//   const alert = await this.alertCtrl.create({
	//     header: headerTxt,
	//     message: msg,
	//     buttons: [
	//       {
	//         text: 'Ok',
	//         handler: () => {
	//           this.appComponent.backButtonEvent();
	//         }
	//       }
	//     ]
	//   });

	//   await alert.present();
	// }
}
