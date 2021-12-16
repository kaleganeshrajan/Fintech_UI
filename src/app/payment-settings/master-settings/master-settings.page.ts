import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { NavController } from '@ionic/angular';
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from 'src/app/utility/api.service';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
  selector: 'app-master-settings',
  templateUrl: './master-settings.page.html',
  styleUrls: ['./master-settings.page.scss'],
  providers: [NetworkProviderService, Network]
})
export class MasterSettingsPage implements OnInit {
  formGroup!: FormGroup;
  public isBanking = true;
  public isPayGateway = false;
  public companyList: any[];
  public bankList: any[];
  public settlementList:any[];
  public paymentgatewayList:any[];
  public paymentSettingId=0
  public saveEditButton="Save"
  public bntbankStyle: string;
  public bntpaymentStyle: string;
  constructor(
    public navController: NavController,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertDialogs: AlertDialogs,) { }

  ngOnInit():void { 
    this.createForm();
  }

  OnBanking() {
    this.isPayGateway = false;
    this.isBanking = true;    
    this.bntbankStyle = 'ion-btn-change';
    this.bntpaymentStyle = 'ion-btn';
  }

  OnPayGateway() {
    this.isPayGateway = true;
    this.isBanking = false;
    this.bntpaymentStyle = 'ion-btn-change';
    this.bntbankStyle = 'ion-btn';
  }

  OnCompanyChange(){
    this.getmasterpaymentsetting()
  }

  /*same as resume */
	ionViewDidEnter() {
		this.getcompanylist();
    this.getbanklist();
    this.getsettlementperiodlist();
    this.getpaymentgatewaylist();      
	}  

  createForm(): any {
		this.formGroup = this.formBuilder.group({
      CompanyCode:[''],
      UPI_BankName:[''],
      ENACH_BankName:[''],
      NETBANKING_BankName:[''],
      INDIFI_BankName:[''],
      MINTIFI_BankName:[''],
      INDIUM_BankName:[''],
      CDC_BankName:[''],
      UPI_SettlementPeriod:[''],
      ENACH_SettlementPeriod:[''],
      NETBANKING_SettlementPeriod:[''],
      INDIFI_SettlementPeriod:[''],
      MINTIFI_SettlementPeriod:[''],
      INDIUM_SettlementPeriod:[''],
      CDC_SettlementPeriod:[''],
      UPI_PaymentGateway:[''],
      ENACH_PaymentGateway:[''],
      NETBANKING_PaymentGateway:[''],
      INDIFI_PaymentGateway:[''],
      MINTIFI_PaymentGateway:[''],
      INDIUM_PaymentGateway:[''],
      CDC_PaymentGateway:['']
		});  

    this.bntbankStyle = 'ion-btn-change';
    this.bntpaymentStyle = 'ion-btn';
    this.insertandupdate()
	}
  
  async getcompanylist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/master_payment_setting/CompanyList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.companyList=result
      } 
    });
  }
  
  async getbanklist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/master_payment_setting/BankList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.bankList=result
      } 
    });
  }

  async getsettlementperiodlist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/master_payment_setting/SettlementList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.settlementList=result
      } 
    });
  }
  
  async getpaymentgatewaylist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/master_payment_setting/PaymentGatewayList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.paymentgatewayList=result
      } 
    });
  }
  
  async insertandupdate() {    
    if (this.formGroup.value.CompanyCode !== '') {
      
		  let postData;
      postData = {
        ID                          :this.paymentSettingId,
        BankingPartners  			      :this.isBanking,						
        PaymentGateway              :this.isPayGateway,  
        UPI_Bank                    :this.isBanking == true?this.formGroup.value.UPI_BankName :""                     ,  
        ENACH_Bank                  :this.isBanking == true?this.formGroup.value.ENACH_BankName   :""                 ,  
        NETBANKING_Bank             :this.isBanking == true?this.formGroup.value.NETBANKING_BankName   :""            ,  
        INDIFI_Bank                 :this.isBanking == true?this.formGroup.value.INDIFI_BankName     :""              ,  
        MINTIFI_Bank                :this.isBanking == true?this.formGroup.value.MINTIFI_BankName   :""               ,  
        INDIUM_Bank                 :this.isBanking == true?this.formGroup.value.INDIUM_BankName    :""              ,  
        CDC_BankName                :this.isBanking == true?this.formGroup.value.CDC_BankName        :""         ,  
        UPI_SettlementPeriod        :this.isBanking == true?this.formGroup.value.UPI_SettlementPeriod   :""       ,  
        ENACH_SettlementPeriod      :this.isBanking == true?this.formGroup.value.ENACH_SettlementPeriod   :""     ,  
        NETBANKING_SettlementPeriod :this.isBanking == true?this.formGroup.value.NETBANKING_SettlementPeriod :""  ,  
        INDIFI_SettlementPeriod     :this.isBanking == true?this.formGroup.value.INDIFI_SettlementPeriod  :""     ,  
        MINTIFI_SettlementPeriod    :this.isBanking == true?this.formGroup.value.MINTIFI_SettlementPeriod :""     ,  
        INDIUM_SettlementPeriod     :this.isBanking == true?this.formGroup.value.INDIUM_SettlementPeriod :""      ,  
        CDC_SettlementPeriod        :this.isBanking == true?this.formGroup.value.CDC_SettlementPeriod   :""       ,  
        UPI_PaymentGateway          :this.formGroup.value.UPI_PaymentGateway            ,  
        ENACH_PaymentGateway        :this.formGroup.value.ENACH_PaymentGateway          ,  
        NETBANKING_PaymentGateway   :this.formGroup.value.NETBANKING_PaymentGateway     ,  
        INDIFI_PaymentGateway       :this.formGroup.value.INDIFI_PaymentGateway         ,  
        MINTIFI_PaymentGateway      :this.formGroup.value.MINTIFI_PaymentGateway        ,  
        INDIUM_PaymentGateway       :this.formGroup.value.INDIUM_PaymentGateway         ,  
        CDC_PaymentGateway          :this.formGroup.value.CDC_PaymentGateway            ,  
        IsActive                    :true              ,
        CompanyCode                 :this.formGroup.value.CompanyCode  
      };
      
      this.apiService
        .postApiOnlyWithContentType(
          'api/master_payment_setting/add',
          postData
        )
        .subscribe((result) => {
          if (result===true){
            if (this.paymentSettingId===0){
              this.alertDialogs.alertDialog('', "Record Inserted successfully...!");
              this.createForm()
            }
            else{
              this.alertDialogs.alertDialog('', "Record Updated successfully...!");
              this.createForm()
            }
          }
        });
    }
	}
  
  async getmasterpaymentsetting(){
    if (this.formGroup.value.CompanyCode!=""){
      this.apiService
			.getApiwithoutauthencticate(
				'api/master_payment_setting/get/'+this.formGroup.value.CompanyCode
			)
			.subscribe((result) => {        
				if (result!== null) {          
          this.paymentSettingId=result.ID
          this.saveEditButton =result.ID==0?'Save': 'Update';

          if (result.BankingPartners==true){
            this.bntpaymentStyle = 'ion-btn';
            this.bntbankStyle = 'ion-btn-change';
            this.isBanking = true;
            this.isPayGateway = false;
          }else if (result.PaymentGateway==true){
            this.isPayGateway = true;
            this.isBanking = false;
            this.bntpaymentStyle = 'ion-btn-change';
            this.bntbankStyle = 'ion-btn';
          }          
          
          this.formGroup['UPI_BankName'] = result.UPI_Bank
          this.formGroup['ENACH_BankName'] = result.ENACH_Bank
          this.formGroup['NETBANKING_BankName'] = result.NETBANKING_Bank
          this.formGroup['INDIFI_BankName'] = result.INDIFI_Bank
          this.formGroup['MINTIFI_BankName'] = result.MINTIFI_Bank
          this.formGroup['INDIUM_BankName'] = result.INDIUM_Bank
          this.formGroup['CDC_BankName'] = result.CDC_BankName
          this.formGroup['UPI_SettlementPeriod'] = result.UPI_SettlementPeriod
          this.formGroup['ENACH_SettlementPeriod'] = result.ENACH_SettlementPeriod
          this.formGroup['NETBANKING_SettlementPeriod'] = result.NETBANKING_SettlementPeriod
          this.formGroup['INDIFI_SettlementPeriod'] = result.INDIFI_SettlementPeriod
          this.formGroup['MINTIFI_SettlementPeriod'] = result.MINTIFI_SettlementPeriod
          this.formGroup['INDIUM_SettlementPeriod'] = result.INDIUM_SettlementPeriod
          this.formGroup['CDC_SettlementPeriod'] = result.CDC_SettlementPeriod          
          this.formGroup['UPI_PaymentGateway'] = result.UPI_PaymentGateway
          this.formGroup['ENACH_PaymentGateway'] = result.ENACH_PaymentGateway
          this.formGroup['NETBANKING_PaymentGateway'] = result.NETBANKING_PaymentGateway
          this.formGroup['INDIFI_PaymentGateway'] = result.INDIFI_PaymentGateway
          this.formGroup['MINTIFI_PaymentGateway'] = result.MINTIFI_PaymentGateway
          this.formGroup['INDIUM_PaymentGateway'] = result.INDIUM_PaymentGateway
          this.formGroup['CDC_PaymentGateway'] = result.CDC_PaymentGateway
				} 
			});
    }      
  }  

}
