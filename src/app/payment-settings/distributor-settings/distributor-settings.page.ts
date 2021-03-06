import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
  selector: 'app-distributor-settings',
  templateUrl: './distributor-settings.page.html',
  styleUrls: ['./distributor-settings.page.scss'],
  providers: [NetworkProviderService, Network]
})
export class DistributorSettingsPage implements OnInit {
  formGroup!: FormGroup;
  public AccountNumber: any;
  public saveEditButton = 'Save';
  public paymentSettingId = 0;
  public DistributorCode: String;
  public distributorList: any[];
  public accounttypeList:any[];
  
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertDialogs: AlertDialogs,

  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /*same as resume */
	ionViewDidEnter() {
		this.getdistributorlist();
	}  
  
  OnDistributorChange(){
    this.getdistributorsetting()
  }

  createForm(): any {
    this.formGroup = this.formBuilder.group({
      AccountNumber: ['', Validators.required],
      BankName: ['', Validators.required],
      BankAccountName: ['', Validators.required],
      IFSCCode: ['', Validators.required],
      UPI: [''],
      DistributorCode: [''],
      AccountType:['', Validators.required]
    });

    this.createandupdate(null);
    this.getdistributorsetting();
    this.getaccounttypelist();
  }

  async getdistributorsetting() {
    if (this.formGroup.value.DistributorCode != "") {
      this.apiService.getApiwithoutauthencticate(
          'api/payment_setting/' + this.formGroup.value.DistributorCode
        ).subscribe((result) => {
          if (result !== null) {
            this.formGroup.patchValue({
              AccountNumber: result.AccountNumber == 0 ? "" : result.AccountNumber,
              BankName:result.BankName,
              BankAccountName:result.BankAccountName,
              IFSCCode:result.IFSCCode,
              UPI:result.UPI,
              AccountType:result.AccountType
            });
            this.saveEditButton = result.ID == 0 ? 'Save' : 'Update';      
            this.paymentSettingId = result.ID;
          }
        }
      );
    }
  }

  async getdistributorlist() {
    this.apiService
      .getApiwithoutauthencticate(
        'api/payment_setting/'
      )
      .subscribe((result) => {
        if (result !== null) {
          this.distributorList = result
        }
      });
  }

  async createandupdate(event) {
    if (this.formGroup.valid) {
      let postData;
      postData = {
        ID: this.paymentSettingId,
        AccountNumber: this.formGroup.value.AccountNumber,
        BankName: this.formGroup.value.BankName,
        BankAccountName: this.formGroup.value.BankAccountName,
        IFSCCode: this.formGroup.value.IFSCCode,
        UPI: this.formGroup.value.UPI,
        DistributorCode: this.formGroup.value.DistributorCode,
        AccountType: this.formGroup.value.AccountType
      };

      this.apiService
        .postApiOnlyWithContentType(
          'api/payment_setting/add',
          postData
        )
        .subscribe((result) => {
          if (result === true) {
            if (this.paymentSettingId === 0) {
              this.alertDialogs.alertDialogwithreload('', "Record Inserted successfully...!");
            }
            else {
              this.alertDialogs.alertDialogwithreload('', "Record Updated successfully...!");
            }
          }
        });
    }
  }
  
  async getaccounttypelist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/masters/GetAccountType'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.accounttypeList=result
      } 
    });
  }
}