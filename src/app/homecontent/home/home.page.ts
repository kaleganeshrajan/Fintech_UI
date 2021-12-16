import { Component, OnInit, ViewChild } from '@angular/core';
import {
	NavController,
	IonButton,
	MenuController,
	ModalController,
	PopoverController,

	AlertController,
	IonSlides,
	Platform
} from '@ionic/angular';
import { AppConstants } from 'src/app/app.constants';
import { HomeModel } from './home.model';
import { Utility } from 'src/app/utility/utility';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { Events } from '@ionic/angular';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { ApiService } from 'src/app/utility/api.service';
import { AppComponent } from 'src/app/app.component';
import { EChartOption } from 'echarts';
import { TheamService } from 'src/app/theamService';
import { ResetHomeMenuIconService } from '../../utility/reset-home-menu-service'

import { ShowEConsentComponent } from './show_econsent-msg.component';
@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class HomePage implements OnInit {
	private sessionData: any;
	public options: HomeModel[] = [];
	private platformName: String;
	public menus: any[];
	public bannerList: any[] = [];
	public isAndroid = false;
	public isTablet = false;
	public isIphone = false;
	public isSelectMonthlyTarget = false;
	public isSelectQuarterlyTarget = false;
	public isSelectYearlyTarget = false;
	public target = 12.2;
	public achieved = 7.5;
	public graph = 100;
	public chartOptionMonthly: EChartOption;
	public chartOptionQuarterly: EChartOption;
	public chartOptionYearly: EChartOption;
	public isDistributorLoggedIn = false;
	public oneSignalId: string = '';
	public oneSignalInitialized: boolean = false;
	public isSubscribed: boolean = true;
	public reloadFirst: any = 0;
	public backButtonSubscription: any;
	companySettings;
	@ViewChild('slides') slides: IonSlides;
	public colorVar = 'primary';
	public headerColor = "";
	public roleDetails: any;
	public companyData;
	public roleType: any;
	public IsSpecialOrder: number;
	public profileId;
	public enableOrderPlacementForMR: any;
	public buttonBackgroundColor = 'orange';
	public isAgreeForEConsent: boolean;

	//public mrUserLogin: any;

	constructor(
		public appConstants: AppConstants,
		public navController: NavController,
		public utility: Utility,
		private apiService: ApiService,
		public menuCtrl: MenuController,
		public network: Network,
		private alertDialogs: AlertDialogs,
		public events: Events,
		public networkProvider: NetworkProviderService,
		private router: Router,
		private appComponent: AppComponent,
		public modalController: ModalController,
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		private platform: Platform,
		public theamService: TheamService,
		private route: ActivatedRoute,
		private resetHomeMenuIconService: ResetHomeMenuIconService,
		private popoverCtrl: PopoverController,

	) {
		this.reloadFirst = this.utility.getReloadFirstKey();
		if (this.reloadFirst === '1') {
			this.modalController.dismiss();
			this.utility.setReloadFirstKey(0);
			window.location.reload();
		}
		// get platform name/type
		this.platformName = this.utility.getPlatform(this.appConstants.platformsKey);
		this.sessionData = this.utility.getSessionObject(this.appConstants.payload);

		this.theamService.getTheamColor().subscribe((colorObj) => {
			if (colorObj.headerColor) {
				this.colorVar = colorObj.headerColor;
			}
			if (colorObj.buttonColor) {
				this.buttonBackgroundColor = colorObj.buttonColor;
			}
		});
		this.resetHomeMenuIconService.getHomePageMenu().subscribe((menus) => {
			if (menus) {

				this.menus = menus;
				this.options = [];
				this.dashboardOptions();
			}
		})
	}

	ngOnInit() {
		if (this.appComponent.isAndroid) {
			this.isAndroid = true;
		} else if (this.appComponent.isIphone) {
			this.isIphone = true;
		} else if (this.appComponent.isTablet) {
			this.isTablet = true;
		}
		if (this.utility.getLoggedUserType() === '2') {
			this.isDistributorLoggedIn = true;
		} else {
			this.isDistributorLoggedIn = false;
		}

		// if (this.isAndroid || this.isIphone) {
		// 	this.getBannersList();
		// }
		this.getBannersList();


		let companyObj = this.utility.getCompanySettingObject("companySetting");
		this.colorVar = companyObj && companyObj.HeaderColor || 'primary';
		this.enableOrderPlacementForMR = companyObj && companyObj.EnableOrderPlacementForMR;
		this.buttonBackgroundColor = companyObj && companyObj.ButtonColor;
		this.companyData = localStorage.getItem('payload');
		this.roleDetails = JSON.parse(this.companyData);
		this.roleType = this.roleDetails.RoleId;
		//const homeData = localStorage.getItem("companySetting");
		if (companyObj === null) {
			if (this.roleType == 5 && !this.roleDetails.ProfileViewed) {
				this.showMerckLogin();
			}
		}

		
		if(!companyObj){
			this.getCompanySetting();
		}else{
			if (this.sessionData.RoleId == this.appConstants.distributerRoleId
				&& companyObj && companyObj.ShowEConsentMsg
				&& this.sessionData.IsEAgreementAccepted == 0) {
					this.showEconsentForm();
			}
		}


		// console.log('===', this.roleType);

		this.menus = this.utility.getSessionObject(this.appConstants.payload).permissions;

		if (this.sessionData !== null) {
			this.sendOneSignalPlayerId();
			this.dashboardOptions();
		} else {
			this.navController.navigateRoot(['/login']);
		}

		if (this.isTablet) {
			if (this.oneSignalInitialized === false) {
				var self = this;
				var OneSignal = window['OneSignal'] || [];

				OneSignal.push([
					'init',
					{
						/* appId: "b3485f33-be66-4a28-ac03-2325c0db8bbd", */
						appId: '9247f1a1-904b-4203-89cb-263f98830881',
						notifyButton: {
							enable: true
						}
					}
				]);
				OneSignal.push(function () {
					OneSignal.showSlidedownPrompt();
				});
				OneSignal.push(function () {
					// Occurs when the user's subscription changes to a new value.
					OneSignal.on('subscriptionChange', function (isSubscribed) {
						OneSignal.getUserId().then((userId) => {
							self.oneSignalId = userId;
							self.isSubscribed = isSubscribed;
							self.saveWebOneSignalPlayerIds();
						});
					});
				});

				this.oneSignalInitialized = true;
			}
		}
	}



	//showMerckLogin
	async showMerckLogin() {
		const alert = await this.alertCtrl.create({
			header: '',
			message: 'Please validate your profile for any correction please contact your CFA',
			//backdropDismiss: false,
			buttons: [
				{
					cssClass: 'item-center',
					text: 'cancel',
					handler: async () => {
						this.updateProfileViewedStatus();
					}
				},
				{
					cssClass: 'item-center',
					text: 'Ok',
					handler: async () => {
						const navigationExtras: NavigationExtras = {
							queryParams: {
								id: this.sessionData.UserId,
								refresh: 'refresh'
							}
						};
						this.updateProfileViewedStatus();
						this.navController.navigateForward(['profile'], navigationExtras);

					}
				}
			],
			backdropDismiss: false
		});
		await alert.present();

	}

	updateProfileViewedStatus() {
		this.apiService
			.patchApi(
				this.appConstants.updateUserProfileViewedStatus,
				{},
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {

			});
	}
	saveWebOneSignalPlayerIds() {
		if (this.sessionData !== null && this.oneSignalId !== null && this.oneSignalId !== '') {
			const playerIds: any[] = [this.oneSignalId];
			const postData = {
				UserId: this.sessionData.UserId,
				PlayerIds: playerIds,
				removePlayerId: !this.isSubscribed
			};
			this.apiService
				.patchApi(
					this.appConstants.updateUserUrl,
					postData,
					this.sessionData[this.appConstants.authTokenKey]
				)
				.subscribe((result) => {
					if (result['status'] === 200) {
						// console.log(result['message']);
					} else {
						// this.alertDialogs.alertDialog('', result['message']);
					}
				});
		}
	}
	// Same as onResume
	ionViewDidEnter() {
		if (this.options.length === 0) {
			this.dashboardOptions();
		}
		if (this.menus.length)
			this.launchPage(this.menus[0].PageId, this.menus[0].PermissionName, 0);
		this.menuCtrl.enable(true);
		this.selectTarget(this.appConstants.monthly);
		this.backButtonSubscription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp();
		});
	}

	openPlaceOrder(optionNumber: string) {
		if (optionNumber === '0') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 4,
					refresh: 'refresh'
				}
			};
			this.navController.navigateForward(['/place-order'], navigationExtras);
		} else if (optionNumber === '4') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 2,
					refresh: 'refresh'
				}
			};
			this.navController.navigateForward(['/place-order'], navigationExtras);
		} else if (optionNumber === '6') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 1,
					refresh: 'refresh'
				}
			};
			this.navController.navigateForward(['/place-order'], navigationExtras);
		}
		// this.navController.navigateForward(['/place-order'], navigationExtras);
		// this.navController.navigateRoot('');
	}

	selectTarget(selectedTargate: any) {
		if (selectedTargate === this.appConstants.monthly) {
			this.isSelectMonthlyTarget = true;
			this.isSelectQuarterlyTarget = false;
			this.isSelectYearlyTarget = false;

			this.target = 12.2;
			this.achieved = 7.5;
		} else if (selectedTargate === this.appConstants.quaterly) {
			this.isSelectMonthlyTarget = false;
			this.isSelectQuarterlyTarget = true;
			this.isSelectYearlyTarget = false;

			this.target = 20;
			this.achieved = 10.5;
		} else if (selectedTargate === this.appConstants.yearly) {
			this.isSelectMonthlyTarget = false;
			this.isSelectQuarterlyTarget = false;
			this.isSelectYearlyTarget = true;

			this.target = 30;
			this.achieved = 20;
		}

		this.graph = 100 * this.achieved / this.target;
	}

	dashboardOptions() {
		for (let i = 0; i < this.menus.length; i++) {
			let MenuIndex = this.menus[i];
			MenuIndex['ArrayIndex'] = i;
			if (this.menus[i]['IsBlockMenu'] === 1) {
				const myOrder = new HomeModel(
					`${i}`,
					this.menus[i]['PermissionName'],
					this.menus[i]['Icon'],
					'',
					this.menus[i]['PageId'],
					this.menus[i]['IsBlockMenu'],
					MenuIndex
				);
				this.options.push(myOrder);
			}
		}
		// let placeAtFirst = 1;
		// for (let i = 0; i < this.menus.length; i++) {
		// 	if (this.menus[i]['PermissionName'] === 'Place Order') {
		// 		placeAtFirst = 0;
		// 	}
		// }
		// for (let i = 0; i < this.menus.length; i++) {
		// 	let MenuIndex = this.menus[i];
		// 	MenuIndex['ArrayIndex'] = i;
		// 	if (this.menus[i]['PermissionName'] === 'Place Order' && placeAtFirst === 0) {
		// 		const placeOrder = new HomeModel(
		// 			'0',
		// 			this.utility.getLoggedUserType() == '4' && this.enableOrderPlacementForMR == 0 ? this.appConstants.myProducts : this.appConstants.placeOrder,
		// 			'my_orders_icon.png',
		// 			'',
		// 			'/short-expiry-place-order',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(placeOrder);
		// 		placeAtFirst = 1;
		// 		i = 0;
		// 	} else if (this.menus[i]['PermissionName'] === 'My Orders' && placeAtFirst === 1) {
		// 		const myOrder = new HomeModel(
		// 			'1',
		// 			this.appConstants.myOrders,
		// 			'my_orders.png',
		// 			'',
		// 			'/completed-orders',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(myOrder);
		// 	} else if (this.menus[i]['PermissionName'] === 'My Invoices' && placeAtFirst === 1) {
		// 		const viewInvoice = new HomeModel(
		// 			'2',
		// 			this.appConstants.myInvoices,
		// 			'my_invoices_icon.png',
		// 			'',
		// 			'/view-invoice',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(viewInvoice);
		// 	} else if (this.menus[i]['PermissionName'] === 'Upload Order' && placeAtFirst === 1) {
		// 		const uploadOrder = new HomeModel(
		// 			'3',
		// 			this.appConstants.uploadOrders,
		// 			'products_offers_icon.png',
		// 			'',
		// 			'/upload-order',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(uploadOrder);
		// 	} else if (this.menus[i]['PermissionName'] === 'Approve Order' && placeAtFirst === 1) {
		// 		const approvePendingOrder = new HomeModel(
		// 			'3',
		// 			this.appConstants.approvePendingOrder,
		// 			'products_offers_icon.png',
		// 			'',
		// 			'/approve-pending-order',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(approvePendingOrder);
		// 	}  else if (
		// 		this.menus[i]['PermissionName'] === 'Pending Order Approval' &&
		// 		placeAtFirst === 1
		// 	) {
		// 		if (
		// 			this.utility.getLoggedUserType() === '0' ||
		// 			this.utility.getLoggedUserType() === '1'
		// 		) {
		// 			const pendingApp = new HomeModel(
		// 				'5',
		// 				this.appConstants.approveOrders,
		// 				'approve_orders.png',
		// 				'',
		// 				'/approve-order',
		// 				this.menus[i]['IsBlockMenu'],
		// 				MenuIndex
		// 			);
		// 			this.options.push(pendingApp);
		// 		}
		// 	} else if (
		// 		this.menus[i]['PermissionName'] === 'Short Expiry Products' &&
		// 		placeAtFirst === 1
		// 	) {
		// 		const newProduct = new HomeModel(
		// 			'6',
		// 			this.appConstants.earlyExpiryProducts,
		// 			'early_expiry_icon.png',
		// 			'',
		// 			'/short-expiry-place-order',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(newProduct);
		// 	} else if (this.menus[i]['PermissionName'] === 'Notes' && placeAtFirst === 1) {
		// 		const mynotes = new HomeModel(
		// 			'8',
		// 			this.appConstants.myNotes,
		// 			'my_notes.svg',
		// 			'',
		// 			'/notes-list',
		// 			this.menus[i]['IsBlockMenu'],
		// 			MenuIndex
		// 		);
		// 		this.options.push(mynotes);
		// 	} else if (
		// 		this.menus[i]['PermissionName'] === 'Order Confirmation' &&
		// 		placeAtFirst === 1
		// 	) {
		// 		if (this.isDistributorLoggedIn) {
		// 			const pendingApp = new HomeModel(
		// 				'5',
		// 				'Confirm Order',
		// 				'approve_orders.png',
		// 				'',
		// 				'/confirm-order',
		// 				this.menus[i]['IsBlockMenu'],
		// 				MenuIndex
		// 			);
		// 			this.options.push(pendingApp);
		// 		}
		// 	}
		// }
	}

	launchPage(launchPage: any, optionName: string, arrayIndex: number) {
		let title = null;
		// if(optionName === 'Products'){
		// 	title = 'Order Product'
		// }
		this.appComponent.launchPage(launchPage, optionName, arrayIndex, "Place Order");
	}

	selectBanner(pageId: any) {
		if (pageId === '/place-order') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 3,
					refresh: 'refresh'
				}
			};
			this.navCtrl.navigateRoot(pageId, navigationExtras);
		} else {
			this.router.navigate([pageId]);
		}
	}

	// ***********************  Api Section *******************
	async getBannersList() {
		const postData = {
			isHomeBanner: true,
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey)
		};
		await this.utility.presentLoading();

		this.apiService
			.postApi(
				this.appConstants.bannersCustomUrl,
				postData,
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				//	console.log(JSON.stringify(result));
				this.utility.dissmissLoader();
				if (result['status'] === 200) {
					this.bannerList = result['payload'];


				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	async sendOneSignalPlayerId() {
		if (this.utility.getPlayerId() === null) {
			return;
		}

		const playerIds: any[] = [];
		playerIds.push(this.utility.getPlayerId());

		const postData = {
			UserId: this.sessionData.UserId,
			PlayerIds: playerIds
		};

		this.apiService
			.patchApi(
				this.appConstants.updateUserUrl,
				postData,
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				console.log(JSON.stringify(result));

				if (result['status'] === 200) {

				} else {

				}
			});
	}
	ionViewWillEnter() {
		this.appComponent.getCompanySetting();
	}
	ionViewWillLeave() {
		this.modalController.getTop().then((v) => (v ? this.modalController.dismiss() : null));
		this.alertCtrl.getTop().then((v) => (v ? this.alertCtrl.dismiss() : null));
		this.menuCtrl.getOpen().then((v) => (v ? this.menuCtrl.close() : null));
		this.backButtonSubscription.unsubscribe();
		this.resetHomeMenuIconService.unsubscribe();
	}



	async getCompanySetting() {
		const sessionData = this.utility.getSessionObject(this.appConstants.payload);
		let postData;
		postData = {
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey)
		};

		this.apiService
			.postApi(
				this.appConstants.getCompanySettings,
				postData,
				sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				if (result['status'] === 200) {
					this.companySettings = result['payload']['CompanySettings'];
					if (this.sessionData.RoleId == this.appConstants.distributerRoleId
						&& this.companySettings && this.companySettings.ShowEConsentMsg
						&& this.sessionData.IsEAgreementAccepted == 0) {
							this.showEconsentForm();
					}
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}


	async showEconsentForm() {
		const modal = await this.modalController.create({
			component: ShowEConsentComponent,
			//	event: myEvent,

			componentProps: {
				'CompanyId': this.utility.getCompanyId(this.appConstants.companyIdKey),
				'RoleId': this.sessionData.RoleId,
				'CFACode': this.sessionData.CFACode,
				'buttonBackgroundColor': this.buttonBackgroundColor,
				'Email': this.sessionData.Email,
				'UserName': this.sessionData.FirstName + ' ' + this.sessionData.LastName,
				'isTablet': this.isTablet,
				'isAndroid': this.isAndroid,
				'isIphone': this.isIphone
			},
			cssClass: 'setting-modal',
			backdropDismiss: false,

		});
		await modal.present();
		const { data } = await modal.onWillDismiss();

	}
	slidesDidLoad(slider: IonSlides) {
		slider.startAutoplay();
	  }
 }
