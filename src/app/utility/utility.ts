import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Injectable, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AppConstants } from '../app.constants';
import { DatePipe } from '@angular/common';
import * as crypto from 'crypto-js';


@NgModule({})
export class Utility {
	data: any;
	isLoading = false
	constructor(
		public navController: NavController,
		private storage: Storage,
		public toastController: ToastController,
		private appConstants: AppConstants,
		public datepipe: DatePipe,
		public loadingController: LoadingController,
		public modalCtrl: ModalController
	) { }

	// on back pressed go to back
	goToBack() {
		this.navController.back();
	}

	// Check String null empty
	checkStringNullEmpty(str: String) {
		if (str !== undefined && str !== null && typeof str === 'string') {
			str = str.trim();
		}

		if (str != null && str !== '') {
			return false;
		} else {
			return true;
		}
	}

	dateDiffInDays(date1,date2) {
		var d1 = new Date(date1);
		var d2 = new Date(date2);
		var diff = Math.abs(d1.getTime() - d2.getTime());
		var daydiff = diff / (1000 * 60 * 60 * 24);
		return daydiff;
	}
	
	// Set User Session
	setSessionObject(key: any, dataObject: any) {
		localStorage.setItem(key, JSON.stringify(dataObject));
	}

	getSessionObject(key: any) {
		const sessionObj = localStorage.getItem(key);

		if (sessionObj !== null && sessionObj !== undefined) {
			return JSON.parse(sessionObj);
		}
		return null;
	}

	// Set Comapny Id
	setCompanyId(companyIdKey: any, companyId: any) {
		localStorage.setItem(companyIdKey, companyId);
	}

	getCompanyId(companyIdKey: any) {
		return localStorage.getItem(companyIdKey);
	}

	// get userid from payload
	getUserId() {
		let userid = 0;
		let payload = JSON.parse(localStorage.getItem(this.appConstants.payload));
		if (payload['UserId']) {
			userid = payload['UserId'];
		}
		return userid;
	}

	//set permissions
	setPermissions(permissions: any) {
		let payload = this.getSessionObject(this.appConstants.payload);
		payload['permissions'] = permissions;
		this.setSessionObject(this.appConstants.payload, payload);
		let payloadForSelect = this.getSessionObject(this.appConstants.setPayLoadForSelect);
		if (payloadForSelect) {
			payloadForSelect['permissions'] = permissions;
			this.setSessionObject(this.appConstants.setPayLoadForSelect, payloadForSelect);
		}
	}
	// Set Selcted Company Obj
	setCompanyObject(selcetedCompId: any, companyList: any[]) {
		let compObject = null;

		if (!this.checkStringNullEmpty(selcetedCompId) && companyList.length !== 0) {
			for (let i = 0; i < companyList.length; i++) {
				const comp = companyList[i];
				// tslint:disable-next-line: radix
				if (selcetedCompId === parseInt(comp.CompanyId)) {
					compObject = comp;
					break;
				}
			}
		}

		localStorage.setItem(this.appConstants.companyObjKey, JSON.stringify(compObject));
	}

	doesComplyToPasswordPolicy(newPassword: string) {
		const regex = new RegExp(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,15}$/g);
		return regex.test(newPassword);
	}

	getCompanyObject() {
		const compObject = localStorage.getItem(this.appConstants.companyObjKey);

		// tslint:disable-next-line: quotemark
		if (compObject !== 'null' && compObject !== null && compObject !== 'undefined') {
			return JSON.parse(compObject);
		}
		return null;
	}
	isCompanyIdNull() {
		if (this.checkStringNullEmpty(localStorage.getItem('companyId'))) {
			return true;
		} else {
			return false;
		}
	}

	// Set platformKey
	setPlatform(platformKey: any, platform: any) {
		localStorage.setItem(platformKey, platform);
	}

	getPlatform(platformKey: any) {
		return localStorage.getItem(platformKey);
	}

	// Set Logged User Type
	setLoggedUserType(roleType: any) {
		localStorage.setItem(this.appConstants.loggedUserTypeKey, roleType);
	}

	getLoggedUserType() {
		return localStorage.getItem(this.appConstants.loggedUserTypeKey);
	}

	// Check is Super Admin logged In
	isSuperAdminLoggedIn() {
		const userType = localStorage.getItem(this.appConstants.loggedUserTypeKey);

		// tslint:disable-next-line: radix
		if (parseInt(userType) === 0) {
			return true;
		} else {
			return false;
		}
	}

	// Set Selected Menu/Permission Id and Name
	setSelectedMenu(permission: any) {
		localStorage.setItem(this.appConstants.selectedPermissionObj, JSON.stringify(permission));
	}

	getSelectedMenu() {
		return JSON.parse(localStorage.getItem(this.appConstants.selectedPermissionObj));
	}

	getSelectedMenuName() {
		const permissionObj = JSON.parse(
			localStorage.getItem(this.appConstants.selectedPermissionObj)
		);
		return permissionObj.PermissionName;
	}

	getSelectedMenuId() {
		const permissionObj = JSON.parse(
			localStorage.getItem(this.appConstants.selectedPermissionObj)
		);
		return permissionObj.PermissionId;
	}

	// Set Place Order Product cart
	addProductIntoCart(cartObj: any) {
		let placeOrderCart: any[] = [];
		placeOrderCart = this.getPlaceOrderProductsCart();
		let isDivisionCodeMatched = false;
		for (let div of placeOrderCart) {
			if (div.DivisionCode == cartObj.DivisionCode) {
				div.Products = div.Products.concat(cartObj.Products);
				isDivisionCodeMatched = true;
			}
		}
		if (!isDivisionCodeMatched) {
			placeOrderCart.push(cartObj);
		}


		localStorage.setItem(
			this.appConstants.placeOrderCartArrKey,
			JSON.stringify(placeOrderCart)
		);
	}

	/** You can set Total Place order cart array */
	setPlaceOrderProductsCart(placeOrderCart: any[]) {
		localStorage.setItem(
			this.appConstants.placeOrderCartArrKey,
			JSON.stringify(placeOrderCart)
		);
	}

	// Get Place Order Product cart
	getPlaceOrderProductsCart() {
		let placeOrderCart: any[] = [];
		placeOrderCart = JSON.parse(localStorage.getItem(this.appConstants.placeOrderCartArrKey));

		if (placeOrderCart === null) {
			placeOrderCart = [];
		}

		return placeOrderCart;
	}

	cleanPlaceOrderProductsCart() {
		const placeOrderCart: any[] = [];
		localStorage.setItem(
			this.appConstants.placeOrderCartArrKey,
			JSON.stringify(placeOrderCart)
		);
	}

	setproductCodeOfPlaceOrderCart(productCode: any) {
		let productCodeArr: any[] = [];
		productCodeArr = this.getproductCodeOfPlaceOrderCart();
		productCodeArr.push(productCode);

		localStorage.setItem(
			this.appConstants.productCodeCartArrKey,
			JSON.stringify(productCodeArr)
		);
	}

	/** You can reset Total Place order Product code cart array */
	resetproductCodeOfPlaceOrderCart(productCodeArr: any[]) {
		localStorage.setItem(
			this.appConstants.productCodeCartArrKey,
			JSON.stringify(productCodeArr)
		);
	}

	getproductCodeOfPlaceOrderCart() {
		let productCodeArr: any[] = [];
		productCodeArr = JSON.parse(localStorage.getItem(this.appConstants.productCodeCartArrKey));

		if (productCodeArr === null) {
			productCodeArr = [];
		}
		return productCodeArr;
	}

	cleanProductCodeOfPlaceOrderCart() {
		const productCode: any[] = [];
		localStorage.setItem(this.appConstants.productCodeCartArrKey, JSON.stringify(productCode));
	}

	// Store Credit note cart
	storeCreditNoteCart(creditNoteArr: any) {
		localStorage.setItem(this.appConstants.creditNoteCartArr, JSON.stringify(creditNoteArr));
	}

	// Get Credit note cart
	getCreditNoteCart() {
		return JSON.parse(localStorage.getItem(this.appConstants.creditNoteCartArr));
	}

	// Set One signal Player id
	setPlayerId(palyerId: any) {
		localStorage.setItem(this.appConstants.playerIdKey, palyerId);
	}

	// Get One signal Player id
	getPlayerId() {
		return localStorage.getItem(this.appConstants.playerIdKey);
	}

	setReloadFirstKey(load: any) {
		localStorage.setItem(this.appConstants.reloadFirstKey, load);
	}

	// Get One signal Player id
	getReloadFirstKey() {
		return localStorage.getItem(this.appConstants.reloadFirstKey);
	}

	// Show toast
	showToast(toastMsg: any, colorName?: any) {
		this.toastController.getTop().then((v) => (v ? this.toastController.dismiss() : null));
		let options = {
			message: toastMsg,
			duration: 2000,
			cssClass: 'toast-css'
		};
		if (colorName !== null && colorName !== undefined && colorName !== '') {
			options['color'] = colorName;
		}
		const toast = this.toastController.create(options).then((toastData) => {
			// console.log(toastData);
			toastData.present();
		});
	}

	async presentToastWithOptions(
		message,
		duration?,
		header?,
		color?,
		position?,
		showCloseButton?
	) {
		const toast = await this.toastController.create({
			message,
			header,
			duration: duration ? duration : 2000,
			color,
			position,
			showCloseButton
		});
		toast.present();
	}

	randomPassword() {
		const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
		let pass = '';
		for (let x = 0; x < 8; x++) {
			const i = Math.floor(Math.random() * chars.length);
			pass += chars.charAt(i);
		}
		return pass;
	}

	monthFirstDay() {
		// Format 2019-07-31
		const date = new Date();
		// return new Date(date.getFullYear(), date.getMonth(), 1);
		const month = date.getMonth();
		const year = date.getFullYear();

		// GET THE FIRST AND LAST DATE OF THE MONTH.
		return this.datepipe.transform(new Date(year, month, 1), 'yyyy-MM-dd');
	}

	lastSixMonthDate() {
		var d = new Date();
		d.setMonth(d.getMonth() - 6);
		const month = d.getMonth();
		const year = d.getFullYear();
		return this.datepipe.transform(new Date(year, month, 1), 'yyyy-MM-dd');
	}

	lastThreeMonthDate() {
		var d = new Date();
		d.setMonth(d.getMonth() - 3);
		const month = d.getMonth();
		const year = d.getFullYear();
		return this.datepipe.transform(new Date(year, month, 1), 'yyyy-MM-dd');
	}

	todaysDate() {
		// Format 2019-07-31
		// const date = new Date();

		// GET THE FIRST AND LAST DATE OF THE MONTH.
		return this.datepipe.transform(new Date(), 'yyyy-MM-dd');
	}

	setPayLoadForSelect(key: any, dataObject: any) {
		localStorage.setItem(key, JSON.stringify(dataObject));
	}

	getPayLoadForSelect(key: any) {
		const payLoadForSelect = localStorage.getItem(key);
		if (payLoadForSelect !== null && payLoadForSelect !== undefined) {
			return JSON.parse(payLoadForSelect);
		}
		return null;
	}
	setShowConfirmAlert(load: any) {
		localStorage.setItem(this.appConstants.showConfirmAlert, load);
	}

	// Get One signal Player id
	getShowConfirmAlert() {
		return localStorage.getItem(this.appConstants.showConfirmAlert);
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
			message: 'Processing...',
			translucent: true,
			spinner: 'bubbles',
			duration: 50000
		});
		return await loading.present();
	}

	async presentLoadingMap() {
		const loading = await this.loadingController.create({
			message: 'Processing...',
			translucent: true,
			spinner: 'bubbles',
			duration: 20000
		});
		await loading.present();
	}
	async presentLoadingUpload() {
		const loading = await this.loadingController.create({
			message: 'Processing...',
			translucent: true,
			spinner: 'bubbles',
			duration: 20000
		});
		await loading.present();
	}
	async presentLoadingDashboard() {
		const loading = await this.loadingController.create({
			message: 'Processing..',
			translucent: true,
			spinner: 'bubbles',
			duration: 45000
		});
		await loading.present();
	}
	async dissmissLoader() {
		return await this.loadingController.dismiss();
	}
	setCompanySettingObject(key: any, dataObject: any) {
		//  console.log(dataObject);
		localStorage.setItem(key, JSON.stringify(dataObject));
		// const companySetting = localStorage.getItem(key);
		// console.log('get' + companySetting);
	}
	getCompanySettingObject(key: any) {
		const companySetting = localStorage.getItem(key);
		if (companySetting !== null && companySetting !== undefined) {
			return JSON.parse(companySetting);
		}
		return null;
	}
	schemeCalculation(
		product: any,
		boxQty?: any,
		caseQty?: any,
		unitQty?: any
	) {

		let totalFreeQty = 0;
		let totalPaidBox = 0;
		let totalPrice = 0;
		let savingAmount = 0;
		let isInclusive = 2;
		let schemeMinQty = 0;
		let selectedProductQuantity = 0;
		let totalBox = 0;
		let companySettings = this.getCompanySettingObject('companySetting');
		if (companySettings.PriceRateType == this.appConstants.orderPriceType.boxPrice
			|| companySettings.PriceRateType == this.appConstants.orderPriceType.casePrice) {
			totalBox = product.orderQuantity;
		} else {
			totalBox = boxQty * (product.BoxPacking || 0) + caseQty * (product.CasePacking || 0) + unitQty;
		}

		if (!this.checkStringNullEmpty(product.SchemeType)) {
			/* if (product.SchemeType == 'Percentage') {
				product.OfferQuantity = parseInt(product.OfferQuantity);
			} */
			if (product.SchemeSubType == 'Multiplier') {
				if (product.SchemeType == 'Percentage') {
					totalFreeQty = parseFloat(product.OfferQuantity);
					schemeMinQty = product.MinimumQuantity;
					isInclusive = product.IsInclusive;
				} else {
					if (totalBox >= product.MinimumQuantity) {
						if (product.SlabTo > 0 && product.MinimumQuantity > 0 && product.SlabTo >= totalBox) {
							let divisor = Math.floor(totalBox / product.MinimumQuantity);
							totalFreeQty = divisor * parseFloat(product.OfferQuantity);
							schemeMinQty = product.MinimumQuantity;
							isInclusive = product.IsInclusive;
						}

					}
				}


			} else if (product.SchemeSubType == 'Slab') {
				let SchemeData;
				if (product.SchemeData != undefined && product.SchemeData != null) {
					SchemeData = product.SchemeData;
				} else if (product.slabsDetails != undefined && product.slabsDetails != null) {
					SchemeData = product.slabsDetails;
				}
				if (SchemeData != undefined && SchemeData != null) {
					for (let scheme of SchemeData) {
						if (totalBox >= scheme.SlabFrom && totalBox >= scheme.SlabTo) {
							if (scheme.SchemeType == 'Percentage') {
								totalFreeQty = parseFloat(scheme.OfferQuantity);
							} else {
								totalFreeQty = scheme.OfferQuantity;
							}
							product['appliedSlab'] = scheme;
							schemeMinQty = scheme.MinimumQuantity;
							isInclusive = scheme.IsInclusive;
							break;
						} else {
							product['appliedSlab'] = null;
						}
					}
				}
			}

			if (isInclusive == 1) {
				/** Inclusive Offer */
				// totalFreeQty = Math.floor((totalBox * FreeQuantity) / SchemeQuantity);
				if (product.SchemeType == 'Percentage') {
					totalPaidBox = totalBox;
					let discountAmount = 0;
					if (totalBox >= schemeMinQty) {
						discountAmount = ((totalBox * product.PTS) * (totalFreeQty)) / 100;
					}
					totalPrice = totalPaidBox * product.PTS - discountAmount;
					totalFreeQty = 0;
				} else {
					totalPaidBox = totalBox - totalFreeQty;
					//console.log(totalPaidBox);
					totalPrice = totalPaidBox * product.PTS;
				}
				selectedProductQuantity = totalPaidBox;
			} else if (isInclusive == 0) {
				/** Exclusive Offer */
				// totalFreeQty = Math.floor((totalBox * FreeQuantity) / SchemeQuantity);
				if (product.SchemeType == 'Percentage') {
					totalPaidBox = totalBox;
					let discountAmount = 0;
					if (totalBox >= schemeMinQty) {
						discountAmount = ((totalBox * product.PTS) * (totalFreeQty)) / 100;
					}
					totalPrice = totalPaidBox * product.PTS - discountAmount;
					//console.log(discountAmount);
				} else {
					totalPaidBox = totalBox;
					if (totalBox >= schemeMinQty) {
						totalPrice = totalPaidBox * product.PTS;
					} else {
						totalPrice = totalBox * product.PTS;
					}
				}

				selectedProductQuantity =
					boxQty * product.BoxPacking + caseQty * product.CasePacking + unitQty;
			} else {
				/** No Offer */
				totalPaidBox = totalBox;
				totalPrice = totalPaidBox * product.PTS;
				selectedProductQuantity =
					boxQty * product.BoxPacking + caseQty * product.CasePacking + unitQty;
			}
			product.TotalPrice = totalPrice;
			product.Free = totalFreeQty;
			//selectedProductQuantity = selectedProductQuantity||boxQty * product.BoxPacking + caseQty * product.CasePacking + unitQty;
		} else {
			selectedProductQuantity = totalBox;
			totalPrice = totalBox * product.PTS;
			product.Free = (totalFreeQty && totalFreeQty != 0) ? totalFreeQty : product.Free;
		}
		product.savingAmount = (totalBox * product.PTS) - totalPrice;
		const schemeCalculationData = {
			TotalPrice: totalPrice,
			savingAmount: product.savingAmount,
			totalFreeQty: (totalFreeQty && totalFreeQty != 0) ? totalFreeQty : product.Free,
			selectedProductQuantity: selectedProductQuantity,
		};
		return schemeCalculationData;
	}
	updateMonthEndOfDistributor(monthEndDays) {
		let payLoad: any = JSON.parse(localStorage.getItem(this.appConstants.payload));
		payLoad.MonthEndDay = monthEndDays;
		localStorage.setItem(this.appConstants.payload, JSON.stringify(payLoad));
	}

	// upateCompanySettings(companyObj){
	// 	let companySettings  = JSON.parse(localStorage.getItem("companySetting"));
	// 	for(let key of companyObj){
	// 		companySettings[key] = companyObj[key];
	// 	}
	// 	localStorage.setItem("companySetting",JSON.stringify(companySettings));

	// }	
	async loadingDismiss() {
		this.isLoading = false;
		return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
	}

	getPendConfirmationFlag() {
		return localStorage.getItem(this.appConstants.isPendiongOrderConfirmationDisabled);
	}

	setPendConfirmationFlag(flagValue) {
		return localStorage.setItem(this.appConstants.isPendiongOrderConfirmationDisabled, flagValue);
	}
	addProductInLocalCart(cartObj) {
		localStorage.setItem("localProductCart", JSON.stringify(cartObj));
	}
	getLocalCartObject() {
		let cartObject = JSON.parse(localStorage.getItem("localProductCart"));
		return cartObject;
	}

	deleteLocalCarObject() {
		localStorage.removeItem("localProductCart");
	}

	deleteSessionObject(key) {
		localStorage.removeItem(key);
	}

	encryptPassword(password) {
		// do not change password encryption policy.
		var passwordBytes = crypto.enc.Utf16LE.parse(password);
		var hashPassword = crypto.SHA1(passwordBytes).toString();
		return hashPassword;
	}



	// Set flag for Sun Pharma order
	setIsSunPharmaOrder(data: any) {
		localStorage.setItem(this.appConstants.isSunpharmaOrder, data);
	}

	// Get flag for Sun Pharma order
	getIsSunPharmaOrder() {
		if(localStorage.getItem(this.appConstants.isSunpharmaOrder) === 'true') {
			return true;
		} else {
			return false;
		}
	}

	// Set flag for Draft Order order
	setIsDraftOrder(data: any) {
		localStorage.setItem(this.appConstants.isDraftOrder, data);
	}

	// Get flag for Draft Order order
	getIsDraftOrder() {
		if(localStorage.getItem(this.appConstants.isDraftOrder) === 'true') {
			return true;
		} else {
			return false;
		}
	}

	// Set flag for Confirm Order order
	setIsConfirmOrder(data: any) {
		localStorage.setItem(this.appConstants.isConfirmOrder, data);
	}

	// Get flag for Confirm Order order
	getIsConfirmOrder() {
		if(localStorage.getItem(this.appConstants.isConfirmOrder) === 'true') {
			return true;
		} else {
			return false;
		}
	}
}
