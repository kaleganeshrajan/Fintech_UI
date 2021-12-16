import { Component, QueryList,Input, ViewChildren, ViewChild,TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import {
	Platform,
	IonRouterOutlet,
	PopoverController,
	ActionSheetController,
	MenuController,
	ModalController,
	NavController,
	Events,
	AlertController,
	IonContent
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppConstants } from './app.constants';
import { Utility } from './utility/utility';
import { Network } from '@ionic-native/network/ngx';
import { NetworkProviderService } from './utility/network-provider.service';
import { AlertDialogs } from './utility/alert-dialogs';
import { ApiService } from './utility/api.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Location } from '@angular/common';
import { TheamService } from "./theamService";
import { environment } from "../environments/environment";

import { ResetHomeMenuIconService } from './utility/reset-home-menu-service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { SessionService } from './utility/session.service';

declare let gtag: Function;

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	providers: [NetworkProviderService, Network]
})
export class AppComponent {
	showSplash = true;
	// set up hardware back button event.
	lastTimeBackPress = 0;
	timePeriodToExit = 2000;
	public userName = ""
	public isPlaceOrderEnable: boolean;
	public isOperationUser: any;
	@ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
	public platformName: String;
	public menus: any = [];
	public companyList: any = [];
	public selectedCompanyId: any = null;
	public isShowCompanyList = false;
	public companyObject: any = {};
	public singleOrder = true;
	// Platform
	public isAndroid = false;
	public isTablet = false;
	public isIphone = false;
	public session: any = null;
	public userPermissions: any[] = null;
	public passwordResetKey: String = null;
	public firstSelectedCompId: any = null;
	public companySettings: any = [];
	public creditNoteFeature = 0;
	public colorVar = 'primary';
	public backGroundColor: any = "red";
	public companyLogo: any;
	public menuWidth = this.appConstants.CLOSE_SIDEBAR;
	public isMenuOpen = 0;
	public companyId: any;
	public notificationCount: 0;
	idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    title = 'angular-idle-timeout';
	public buttonBackgroundColor = 'dark';
	public companyObj: any;

	@ViewChild('companyComponent') companyComponent: IonicSelectableComponent;
	@ViewChild('ionContent') ionContent: IonContent;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public modalCtrl: ModalController,
		private menu: MenuController,
		private actionSheetCtrl: ActionSheetController,
		private popoverCtrl: PopoverController,
		private router: Router,
		public appConstants: AppConstants,
		public navCtrl: NavController,
		public utility: Utility,
		public network: Network,
		public events: Events,
		public networkProvider: NetworkProviderService,
		private alertDialogs: AlertDialogs,
		private apiService: ApiService,
		private oneSignal: OneSignal,
		private alertCtrl: AlertController,
		private route: ActivatedRoute,
		private sessionService: SessionService,
		private location: Location,
		private theamService: TheamService,
		private resetHomeMenuIconService: ResetHomeMenuIconService,
		private idle: Idle, private keepalive: Keepalive,
	) {
		// Initialize BackButton Eevent.
		// this.backButtonEvent();
		// get platform name/type
		if (environment.GOOGLE_ANALYTICS_CODE) {
			this.router.events.subscribe(event => {
				if (event instanceof NavigationEnd) {
					gtag('config', environment.GOOGLE_ANALYTICS_CODE,
						{
							'page_path': event.urlAfterRedirects
						}
					);
				}
			});
		}
		this.theamService.getTheamColor().subscribe((colorObj) => {
			if (colorObj.menuBarColor) {
				this.colorVar = colorObj.menuBarColor;
			}
		});

		idle.setIdle(this.appConstants.sessionTimeOutInSecond);
		idle.setTimeout(this.appConstants.idleTimeOutInSecond);
		idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		idle.onIdleEnd.subscribe(() => {
		  this.idleState = 'No longer idle.'
		});

		idle.onTimeout.subscribe(() => {
		  this.idleState = 'Timed out!';
		  this.timedOut = true;
		  this.logOut();
		});

		idle.onIdleStart.subscribe(() => {
			this.idleState = 'Session Expaired!'
			this.sessionDetails()
		});
		//  ping interval to 15 seconds
		keepalive.interval(3600);

		keepalive.onPing.subscribe(() => this.lastPing = new Date());

		this.sessionService.getUserLoggedIn().subscribe(userLoggedIn => {
		  if (userLoggedIn) {
			idle.watch()
			this.timedOut = false;
		  } else {
			idle.stop();
		  }
		})

	}

	  async sessionDetails() {

		
	}

	ngOnInit() {
		this.session = this.utility.getSessionObject(this.appConstants.payload);
		const platformArr = this.platform.platforms();
		const platForm = this.getOS();
		if (platForm == 'Android') {
			this.isMenuOpen = 1;
			this.platformName = 'android';
			this.isAndroid = true;
		} else if (platformArr.includes('tablet')) {
			this.isTablet = true;
			this.platformName = 'tablet';
		} else if (platForm == 'Windows' || platForm == 'Linux' || platForm == 'Mac OS') {
			this.isTablet = true;
			this.platformName = 'desktop';
		} else if (platformArr.includes('iphone') || platForm == 'iOS') {
			this.isMenuOpen = 1;
			this.isIphone = true;
			this.platformName = 'iphone';
		}
		this.utility.setPlatform(this.appConstants.platformsKey, this.platformName);

		this.initializeApp();
		this.backButtonEvent();

		if (this.platformName !== 'desktop') {
			this.splashScreen.show();
		}

		if (this.session !== null) {
			this.getCompanySetting();
		}
		this.refreshUserDetails();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// this.statusBar.styleDefault();
			// set status bar to white
			this.statusBar.backgroundColorByHexString('#185f97');
			setTimeout(() => {
				this.splashScreen.hide();
			}, 1000);

			setTimeout(() => {
				this.showSplash = false;
			}, 8000);
			this.networkProvider.initializeNetworkEvents();
			// Offline event
			this.events.subscribe('network:offline', () => {
				this.utility.showToast(this.appConstants.checkInternet);
			});

			// Online event
			this.events.subscribe('network:online', () => {
				this.utility.showToast('Back online', 'success');
			});
		});

		if (this.isAndroid || this.isIphone) {
			this.setupPush();
		}
	}


	getOS() {
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			iosPlatforms = ['iPhone', 'iPad', 'iPod'],
			os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'Mac OS';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'iOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'Linux';
		}
		return os;
	}

	refreshUserDetails() {
		this.session = this.utility.getSessionObject(this.appConstants.payload);
		if (this.session) {
			this.userName = this.session.FirstName + ' ' + this.session.LastName;
			this.companyId = this.utility.getCompanyId(this.appConstants.companyIdKey)
			if (this.session.CFACode != 0) {
				this.userName += ` (${this.session.CFACode})`;
			} else if (this.session.DistributorCode[this.companyId]) {
				this.userName += ` (${this.session.DistributorCode[this.companyId]})`;
			}

			if (this.session === null) {
				this.getNotifications();
			}

			let items = 0;
			this.appConstants.globalCartCount = items;
			this.getNotifications();
			this.companySettings = this.utility.getCompanySettingObject('companySetting');
			this.colorVar = this.companySettings && this.companySettings.HeaderColor || 'primary';
			let payloadData = this.utility.getPayLoadForSelect('payload');
			this.isOperationUser = payloadData.RoleId;

			if (this.companySettings) {
				this.setFlag();
			} else {
				//this.getCompanySettingWithId();
			}
		}
	}
	setFlag() {
		this.isPlaceOrderEnable = (this.companySettings.EnableOrderPlacementForMR == 0 &&
			(this.session.RoleId == this.appConstants.mrRoleId
				|| this.session.RoleId == this.appConstants.companyUsersRoleId))
			|| +this.session.Locked[this.companySettings.CompanyId] ? false : true;
		if (+this.session.Locked[this.companySettings.CompanyId]) {
			this.alertDialogs.alertDialog('', this.appConstants.accountBlockMSG);
		}
		if (this.companySettings && this.companySettings.OrderPlacement == 1) {
			this.getCartCount();
		}
	}



	showNotifications() {
		this.navCtrl.navigateForward(['notification-list']);
	}

	getCartCount() {
		let DistributorCode;
		if (this.session.RoleId == this.appConstants.distributerRoleId) {
			DistributorCode = this.session.DistributorCode[this.utility.getCompanyId(this.appConstants.companyIdKey)];
		}
		let postData =
		{
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey),
			DistributorCode: DistributorCode
		}

		this.apiService.postApi(this.appConstants.getCartCount, postData,
			this.session[this.appConstants.authTokenKey])
			.subscribe((res) => {
				if (res.status == 200) {
					this.appConstants.globalCartCount = res.payload.CartCount;
				}
			})
	}

	async openCart() {

		// console.log(this.companySettings);
		if (this.companySettings !== null && this.companySettings !== undefined) {
			if (this.companySettings.OrderPlacement == 1) {
				this.singleOrder = false;
				// if (this.utility.getPlaceOrderProductsCart().length === 0) {
				// 	this.utility.showToast('Empty Cart');
				// 	return;
				// }
				const navigationExtras: NavigationExtras = {
					queryParams: {
						divisionId: '',
						distributorId: '',
						cfaId: '',
						refresh: 'refresh'
					}
				};

				this.navCtrl.navigateForward(['cart-subtotal'], navigationExtras);

			} else {
				this.singleOrder = true;
			}
		}

	}

	async getNotifications() {
		const postData = '';
		this.apiService
			.postApi(
				this.appConstants.getInAppNotificationsTotal,
				postData,
				this.session[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				if (result['status'] === 200) {
					this.notificationCount = result['payload'][0].TotalNotifications;
					this.appConstants.notificationUnreadCount = this.notificationCount;
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	async getCompanySettingWithId() {
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
					this.setFlag();
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	ionViewWillEnter() {
		// this.getCompanySetting();
	}

	ionViewDidEnter() {
		this.companyObject = this.utility.getCompanyObject();
	}
	menuOpenClose() {
		if (this.isMenuOpen === 1) {
			this.menuWidth = this.appConstants.CLOSE_SIDEBAR;
			this.isMenuOpen = 0;
		} else {
			this.menuWidth = this.appConstants.OPEN_SIDEBAR;
			this.isMenuOpen = 1;
		}
	}

	menuOpen() {
		this.menuWidth = this.appConstants.OPEN_SIDEBAR;
		this.isMenuOpen = 1;
	}

	menuClose() {
		this.menuWidth = this.appConstants.CLOSE_SIDEBAR;
		this.isMenuOpen = 0;
	}
	/** Set Menus */
	async setMenus(payload: any, refresh: any, isIframe: any) {
		const myMenus: any[] = [];
		this.menus = [];
		var LastSelectedMenu = this.utility.getSelectedMenu();

		const companyId = this.utility.getCompanyId(this.appConstants.companyIdKey);
		/** If Superadmin/Distributor logged in  then get list of companies */
		// console.log(payload);
		if (this.utility.isSuperAdminLoggedIn() || this.utility.getLoggedUserType() === '2' || payload.RoleId == this.appConstants.operationRoleId) {
			this.setCompanyList(payload, companyId);
		} else {
			this.isShowCompanyList = false;
			this.companyList = payload.Companies;
			if (this.companyList !== undefined && this.companyList.length === 1) {
				this.selectedCompanyId = this.companyList[0].CompanyId;
				this.utility.setCompanyObject(this.selectedCompanyId, this.companyList);
				this.companyObject = this.utility.getCompanyObject();
				// console.log('toolbar::::', this.companyObject);
			}
		}

		if (payload.permissions.length > 0) {
			this.userPermissions = payload.permissions;
			var IsSelected = false;
			let isSunpharmaOrder = false;
			let isDraftOrder = false;
			let isConfirmOrder = false;
			for (let i = 0; i < payload.permissions.length; i++) {
				if (
					LastSelectedMenu !== null &&
					LastSelectedMenu.PermissionId !== undefined &&
					LastSelectedMenu.PermissionId == payload.permissions[i].PermissionId &&
					LastSelectedMenu.SelectedMenu == true
				) {
					payload.permissions[i]['SelectedMenu'] = true;
					IsSelected = true;
				} else {
					payload.permissions[i]['SelectedMenu'] = false;
				}

				const permission = payload.permissions[i];
				if (permission.PageId === this.appConstants.uploadOrderPageUrl) {
					isSunpharmaOrder = true;
				}	
				if (permission.PageId === this.appConstants.draftOrderPageUrl) {
					isDraftOrder = true;
				}
				if (permission.PageId === this.appConstants.confirmOrderPageUrl) {
					isConfirmOrder = true;
				}
				// tslint:disable-next-line: quotemark
				if (this.utility.checkStringNullEmpty(companyId) || companyId === 'null') {
					if (permission.IsGlobal === 1) {
						myMenus.push(permission);
					}
					// tslint:disable-next-line: quotemark
				} else if (!this.utility.checkStringNullEmpty(companyId) && companyId !== 'null') {
					if (permission.PermissionName == 'Credit Note') {
						if (this.creditNoteFeature == 1) {
							myMenus.push(permission);
						}
					} else {
						myMenus.push(permission);
					}

				}

			}
			this.utility.setIsSunPharmaOrder(isSunpharmaOrder);
			this.utility.setIsDraftOrder(isDraftOrder);
			this.utility.setIsConfirmOrder(isConfirmOrder);
		}
		/** Set first item/Menu selected */
		if (myMenus.length > 0 && IsSelected !== true) {
			myMenus[0].SelectedMenu = true;
			this.utility.setSelectedMenu(myMenus[0]);
			/* for (let i = 0; i < myMenus.length; i++) {
		if (i === 0) {
		  myMenus[i].selected = true;
		} else {
		  myMenus[i].selected = false;
		}
	  } */
		}
		this.menus = myMenus;
		//this.navCtrl.pop();
		if (refresh) {
			this.navCtrl.navigateRoot(['/tabs']);
		}
		if (isIframe) {
			window.parent.location.replace('/#/tabs/tabs/home');
			this.utility.setReloadFirstKey(1);
		}
		//console.log(this.menus);
	}

	// active hardware back button
	backButtonEvent() {
		// console.log('Back Pressed', '******************************');
		this.modalCtrl.getTop().then((v) => (v ? this.modalCtrl.dismiss() : null));
		this.popoverCtrl.getTop().then((v) => (v ? this.popoverCtrl.dismiss() : null));
		this.alertCtrl.getTop().then((v) => (v ? this.alertCtrl.dismiss() : null));
		this.menu.getOpen().then((v) => (v ? this.menu.close() : null));

	}

	// launch navigation drawer pages
	launchPage(launchPage: any, permissionName: any, position: any, title = "Place Order") {
		// +++++++++++++++++++++++++++
		for (let i = 0; i < this.menus.length; i++) {
			if (i === position) {
				this.menus[i].SelectedMenu = true;
				this.utility.setSelectedMenu(this.menus[i]);
			} else {
				this.menus[i].SelectedMenu = false;
			}
		}

		// tslint:disable-next-line: max-line-length
		if (launchPage === '/upload-order' && this.platformName === 'android') {
			this.navCtrl.navigateRoot(['/tabs']);
			return;
		}

		const id = 0;
		if (permissionName === 'Place Order') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 3,
					refresh: 'refresh',
					title
				}
			};

			//this.navCtrl.navigateForward([launchPage], navigationExtras);
			this.navCtrl.navigateRoot(launchPage, navigationExtras);
		} else if (permissionName === 'New Products') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 2,
					refresh: 'refresh'
				}
			};

			//this.navCtrl.navigateForward([launchPage], navigationExtras);
			this.navCtrl.navigateRoot([launchPage], navigationExtras);
		} else if (permissionName === 'Short Expiry Products') {
			const navigationExtras: NavigationExtras = {
				queryParams: {
					id: 1,
					refresh: 'refresh'
				}
			};

			//this.navCtrl.navigateForward([launchPage], navigationExtras);
			this.navCtrl.navigateRoot([launchPage], navigationExtras);
		} else {
			this.navCtrl.navigateRoot([launchPage]);
		}
	}

	logOut() {
		//this.apiService.setUserLoggedIn(false);
		this.utility.setSessionObject(this.appConstants.payload, null);
		this.utility.setSelectedMenu(null);
		this.utility.setCompanyId(this.appConstants.companyIdKey, null);
		this.utility.setCompanyObject(null, null);
		this.utility.setLoggedUserType(0);
		this.appConstants.globalCart = [];
		this.utility.cleanPlaceOrderProductsCart();
		this.utility.cleanProductCodeOfPlaceOrderCart();
		this.appConstants.globalCartCount = 0;
		this.isShowCompanyList = false;
		/** Clerar credit note cart */
		const products = [];
		this.utility.storeCreditNoteCart(products);
		this.ScrollToTop();
		localStorage.clear();
		window.location.href = '/';
		//this.navCtrl.navigateRoot(['/login']);
	}

	async setSelectedCompany() {
		this.session = this.utility.getSessionObject(this.appConstants.payload);
		this.firstSelectedCompId = this.utility.getCompanyId(this.appConstants.companyIdKey);
		this.utility.setCompanyId(this.appConstants.companyIdKey, this.selectedCompanyId);
		this.appConstants.globalCart = [];
		this.getCompanySetting();
		this.refreshUserDetails();
		// this.navCtrl.pop();
		// this.navCtrl.navigateRoot([this.popoverCtrl.getTop()]);

		// const active = this.popoverCtrl.getTop(); // or getByIndex(int) if you know it
		// this.navCtrl.back();

		// tslint:disable-next-line: quotemark
		if (
			this.firstSelectedCompId == 'null' ||
			this.firstSelectedCompId == null ||
			this.firstSelectedCompId != '0'
		) {
			if (this.session !== null) {
				this.setMenus(this.session, false, false);
			}
		}
		this.utility.cleanPlaceOrderProductsCart();
		this.utility.cleanProductCodeOfPlaceOrderCart();
		this.appConstants.globalCartCount = 0;
		//this.navCtrl.pop();
		this.navCtrl.navigateRoot(['/tabs']);
	}

	async setupPush() {
		// I re end to put these into your environment.ts
		this.oneSignal.startInit('b3485f33-be66-4a28-ac03-2325c0db8bbd', 'pharmarack-6862c');

		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

		// Notifcation was received in general
		this.oneSignal.handleNotificationReceived().subscribe((data) => {
			const msg = data.payload.body;
			const title = data.payload.title;
			const additionalData = data.payload.additionalData;
			this.showAlert(title, msg, additionalData.task);
		});

		// Notification was really clicked/opened
		this.oneSignal.handleNotificationOpened().subscribe((data) => {
			// Just a note that the data is a different place here!
			const additionalData = data.notification.payload.additionalData;

			this.showAlert(
				'Notification opened',
				'You already read this before',
				additionalData.task
			);
		});

		this.oneSignal.endInit();

		this.oneSignal.getIds().then((obj) => {
			// this.utility.showToast(JSON.stringify(obj) + 'asdasdsdasd' + obj.pushToken);
			// this.alertDialogs.alertDialog('', JSON.stringify(obj));
			this.utility.setPlayerId(obj.userId);
		});
	}

	async showAlert(title, msg, task) {
		const alert = await this.alertCtrl.create({
			header: title,
			subHeader: msg,
			buttons: [
				{
					text: `Action: ${task}`,
					handler: () => {
						// E.g: Navigate to a specific screen
					}
				}
			]
		});
		alert.present();
	}

	/** Set Company list  */
	async setCompanyList(payload: any, selectedCompanyId: any) {
		this.isShowCompanyList = true;
		this.companyList = payload.Companies;

		// tslint:disable-next-line: quotemark
		if (
			this.companyList !== undefined &&
			this.companyList.length > 0 &&
			(!this.utility.checkStringNullEmpty(selectedCompanyId) && selectedCompanyId !== 'null')
		) {
			// tslint:disable-next-line: radix
			this.selectedCompanyId = parseInt(selectedCompanyId);
			this.utility.setCompanyObject(this.selectedCompanyId, this.companyList);
			this.companyObject = this.utility.getCompanyObject();
		} else {
			this.selectedCompanyId = null;
		}
	}

	// ****************  Api Section ****************
	async getCompanyList1() {
		const sessionData = this.utility.getSessionObject(this.appConstants.payload);

		this.apiService
			.getApi(this.appConstants.companiesUrl, sessionData[this.appConstants.authTokenKey])
			.subscribe((result) => {
				// console.log(JSON.stringify(result));
				if (result['status'] === 200) {
					this.companyList = result['payload'];

					const companyId = this.utility.getCompanyId(this.appConstants.companyIdKey);

					if (this.companyList !== undefined && this.companyList.length > 0) {
						// tslint:disable-next-line: quotemark
						if (companyId !== null && companyId !== '0' && companyId !== 'null') {
							// tslint:disable-next-line: radix
							this.selectedCompanyId = parseInt(companyId);
							this.isShowCompanyList = true;
						} else {
							// this.selectedCompanyId = this.companyList[0].CompanyId;
							// this.utility.setCompanyId(this.appConstants.companyIdKey, this.selectedCompanyId);
							this.selectedCompanyId = null;
							this.isShowCompanyList = false;
						}
					}
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}

	async checkURLAccess() {
		return true;
	}

	clearCompany() {
		this.companyComponent.searchText = '';
		this.companyComponent.close();
	}

	ScrollToTop() {
		this.ionContent.scrollToTop();
	}
	ionViewWillLeave() {
		this.backButtonEvent();
	}
	async getCompanySetting() {
		const sessionData = this.utility.getSessionObject(this.appConstants.payload);
		let postData;
		postData = {
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey),
			UserId: this.utility.getUserId(),
			UserType: this.utility.getLoggedUserType()
		};

		this.apiService
			.postApi(
				this.appConstants.getCompanySettings,
				postData,
				sessionData[this.appConstants.authTokenKey]
			)
			.subscribe((result) => {
				if (result['status'] === 200) {
					this.companySettings = result['payload']['CompanySettings'] || {};
					this.utility.setPermissions(result['payload']['UserPermissions'])
					this.resetHomeMenuIconService.setHomePageMenu(result['payload']['UserPermissions']);
					if (this.companySettings.FooterColor != '') {
						this.colorVar = this.companySettings.FooterColor;
					}
					let color = 'primary';
					if (this.companySettings.HeaderColor != '') {
						color = this.companySettings.HeaderColor;
					}
					this.companySettings.Logo = environment.apiBaseUrl + 'files/uploads/' + this.companySettings.Logo;
					this.companyLogo = this.companySettings.Logo;

					let colorBtn = 'dark';
					if (this.companySettings.ButtonColor != '') {
						colorBtn = this.companySettings.ButtonColor;
					}
					this.theamService.setTheamColor({ "buttonColor": colorBtn, "headerColor": color, logoUrl: this.companyLogo });

					this.session = this.utility.getSessionObject(this.appConstants.payload);
					if (this.session !== null) {
						if (this.companySettings.CreditNoteFeature == 1) {
							this.creditNoteFeature = 1;
						} else {
							this.creditNoteFeature = 0;
						}
						this.setMenus(this.session, false, false);
					}

					if (this.companySettings !== null && this.companySettings !== undefined) {
						this.utility.setCompanySettingObject(
							'companySetting',
							this.companySettings
						);
						this.setFlag();
					}
				} else {
					this.alertDialogs.alertDialog('', result['message']);
				}
			});
	}
}
