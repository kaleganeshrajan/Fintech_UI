import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { ModalController,PopoverController,Events } from '@ionic/angular';
import { AppConstants } from 'src/app/app.constants';
import { ApiService } from 'src/app/utility/api.service';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { Utility } from 'src/app/utility/utility';
import { TheamService } from 'src/app/theamService';

@Component({
  selector: "app-show-econsent",
  templateUrl: "./show_econsent-msg.component.html",
  styleUrls: ["./show_econsent-msg.component.scss"]
})

export class ShowEConsentComponent {

  @Input("CFACode") CFACode: string;
  @Input("RoleId") RoleId: string;
  @Input("Email") Email: string;
  @Input("UserName") UserName: string;

  @Input("CompanyId") CompanyId: string;

  @Input("isTablet") isTablet: boolean;
  @Input("isAndroid") isAndroid: boolean;

  @Input("isIphone") isIphone: boolean;
 // @Input("colorVar") colorVar: any;
 // @Input("buttonBackgroundColor") buttonBackgroundColor: any;
  sessionData: any;
  DownloadData: any
	public isShowCompanyList = false;
	public colorVar = 'primary';
	public buttonBackgroundColor = 'dark';
	public checkMarkTrue: boolean = false;

     
  constructor(private modalctrl: ModalController,
    public appConstants: AppConstants,
    private apiService: ApiService,
		private utility: Utility,
		public theamService: TheamService,
		private popoverController: PopoverController,
		private events: Events,
    private alertDialogs: AlertDialogs) {
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
	  let companyObj = this.utility.getCompanySettingObject("companySetting");
	  this.colorVar = companyObj && companyObj.HeaderColor || 'primary';
	  this.buttonBackgroundColor = companyObj && companyObj.ButtonColor;
	 
  }

	changeMarkTrueFalse() {
		if (this.checkMarkTrue) {
			this.checkMarkTrue = false;
		} else {
			this.checkMarkTrue = true;
		}
	}

  acceptEconsentAgreement() {
    let postData = {
			CompanyId: this.utility.getCompanyId(this.appConstants.companyIdKey),
			CFACode: this.CFACode,
			RoleId: this.RoleId,
			Email: this.Email,
			UserName: this.UserName
		};
		
		this.utility.presentLoading();
		this.apiService.postApi( this.appConstants.acceptEconsentAgreement,	postData,	this.sessionData[this.appConstants.authTokenKey]).subscribe((res) => {
      if (res.status == 200) {
		  
				this.utility.dissmissLoader();
			    this.sessionData.IsEAgreementAccepted = 1
				this.utility.setSessionObject(this.appConstants.payload, this.sessionData);
				this.DownloadData=res['payload']
				this.dismisModel();

  	  }
			});
			
			
  }

  dismisModel() {
    this.modalctrl.dismiss({
	  'dismissed': true,
	  "DownloadData": this.DownloadData

		});

		// this.events.publish('fromPopoverEvent');
		// this.popoverController.dismiss();
  }

  closeModal() {
    this.modalctrl.dismiss({
     'dismissed': true,
		});
		// this.events.publish('fromPopoverEvent');
		// this.popoverController.dismiss();
    this.logOut();
	}
		
  logOut() {
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
  	//	this.ScrollToTop();
		localStorage.clear();
		window.location.href = '/';
		//this.navCtrl.navigateRoot(['/login']);
	}
}