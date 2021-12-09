import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { ApiService } from 'src/app/utility/api.service';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { Utility } from 'src/app/utility/utility';
import { Network } from '@ionic-native/network/ngx';
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { Events, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { TheamService } from 'src/app/theamService';

@Component({
	selector: 'app-notification-list',
	templateUrl: './notification-list.page.html',
	styleUrls: ['./notification-list.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class NotificationListPage implements OnInit {
	private sessionData: any;
	public notificationsList: any[] = [];
	public isShowLoadMore = true;
	private offSet = 0;
	public notificationTotal = 0;
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	public colorVar = 'primary';
	public headerColor = '';
	public buttonBackgroundColor = 'dark';
	constructor(
		public appConstants: AppConstants,
		private apiService: ApiService,
		private alertDialogs: AlertDialogs,
		private utility: Utility,
		public network: Network,
		public events: Events,
		public networkProvider: NetworkProviderService,
		private route: ActivatedRoute,
		public navController: NavController,
		public alertCtrl: AlertController,
		private router: Router,
		private appComponent: AppComponent,
		public theamService: TheamService
	) {
		this.theamService.getTheamColor().subscribe((colorObj) => {
			if (colorObj.headerColor) {
				this.colorVar = colorObj.headerColor;
			}
			if (colorObj.buttonColor) {
				this.buttonBackgroundColor = colorObj.buttonColor;
			}
		});
	}

	ngOnInit() {
		this.sessionData = this.utility.getSessionObject(this.appConstants.payload);
		const companyObj = this.utility.getCompanySettingObject('companySetting');
		this.colorVar = companyObj && companyObj.HeaderColor || 'primary';
		this.buttonBackgroundColor = companyObj && companyObj.ButtonColor || 'dark';

	}

	/*same as resume */
	ionViewDidEnter() {
		this.getNotifications(null, null);
		this.getNotificationTotal();
	}

	// **************** Call api *****************
	async getNotifications(event, isLoadMore: boolean) {
		let postData;
		if (!isLoadMore) {
			this.offSet = 0;
		}
		postData = {
			limit: this.appConstants.paginationLimit,
			offset: this.offSet,
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey)
		};
		
		
		this.apiService
			.postApi(
				this.appConstants.getNotificationsUrl,
				postData,
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				// console.log(JSON.stringify(result));
				if (result['status'] === 200) {
					const notificationIds: any[] = [];
					if (isLoadMore) {
						const data = result['payload'];
						if (data.length > 0) {
							for (let i = 0; i < data.length; i++) {
								this.notificationsList.push(data[i]);
								// const noti = data[i];
								// notificationIds.push(noti.NotificationId);
							}
							event.target.complete();
							this.updateNotifications(this.sessionData.UserId);
							if (data.length < this.appConstants.paginationLimit) {
								this.isShowLoadMore = false;
								event.target.disabled = true;
							} else {
								if (this.notificationTotal === this.notificationsList.length) {
									event.target.disabled = true;
								}
								this.isShowLoadMore = true;
								this.offSet = this.offSet + this.appConstants.paginationLimit;
							}
						} else {
							this.isShowLoadMore = false;
							this.infiniteScroll.disabled = true;
						}
					} else {
						this.notificationsList = result['payload'];
						/* for (let i = 0; i < this.notificationsList.length; i++) {
				const noti = this.notificationsList[i];
				notificationIds.push(noti.NotificationId);
			  } */
						this.updateNotifications(this.sessionData.UserId);
						this.appConstants.notificationUnreadCount = 0;
						if (
							this.notificationsList.length === 0 ||
							this.notificationsList.length < this.appConstants.paginationLimit
						) {
							this.isShowLoadMore = false;
							this.infiniteScroll.disabled = true;
						} else {
							this.isShowLoadMore = true;
							this.offSet = this.offSet + this.appConstants.paginationLimit;
							this.infiniteScroll.disabled = false;
						}
					}
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	async loadData(event, isLoadMore: boolean) {
		this.isShowLoadMore = false;
		if (!isLoadMore) {
			this.offSet = 0;
		}
		this.getNotifications(event, isLoadMore);
	}

	async updateNotifications(UserId: any) {
		const postData = {
			UserId: UserId
		};

		this.apiService
			.patchApi(
				this.appConstants.updateNotificationsUrl,
				postData,
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				// console.log(JSON.stringify(result));
				if (result['status'] === 200) {
					// this.notificationsList = result['payload'];
				} else {
					// this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	async getNotificationTotal() {
		this.apiService
			.getApi(
				this.appConstants.totalNotifications + '/' + this.utility.getCompanyId(this.appConstants.companyIdKey),
				this.sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				// console.log(JSON.stringify(result));
				if (result['status'] === 200) {
					this.notificationTotal = result['payload'][0].TotalNotifications;
				} else {
					this.alertDialogs.successAlert('', result['message']);
				}
			});
	}
	ionViewWillLeave() {
		this.appComponent.backButtonEvent();
	}
}
