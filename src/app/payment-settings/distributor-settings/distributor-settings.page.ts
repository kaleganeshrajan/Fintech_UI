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

  createForm(): any {
    this.formGroup = this.formBuilder.group({
      AccountNumber: ['', Validators.required],
      BankName: ['', Validators.required],
      BankAccountName: ['', Validators.required],
      IFSCCode: ['', Validators.required],
      UPI: [''],
      DistributorCode: ['']
    });

    this.createandupdate(null);
    this.getdistributorsetting();
  }

  async getdistributorsetting() {
    if (this.formGroup.value.DistributorCode != "") {
      this.apiService
        .getApiwithoutauthencticate(
          'api/payment_setting/' + this.formGroup.value.DistributorCode
        )
        .subscribe((result) => {
          if (result !== null) {
            this.saveEditButton = result.ID == 0 ? 'Save' : 'Update';
            this.formGroup['AccountNumber'] = result.AccountNumber == 0 ? "" : result.AccountNumber;
            this.formGroup['BankName'] = result.BankName;
            this.formGroup['BankAccountName'] = result.BankAccountName;
            this.formGroup['IFSCCode'] = result.IFSCCode;
            this.formGroup['UPI'] = result.UPI;
            this.paymentSettingId = result.ID

          }
        });
    }
  }

  async getdistributorlist() {
    this.apiService
      .getApiwithoutauthencticate(
        'api/payment_setting/'
      )
      .subscribe((result) => {
        if (result !== null) {
          //  debugger
          this.distributorList = result
        }
      });
  }

  async createandupdate(event) {
    if (this.formGroup.value.AccountNumber !== '') {
      let postData;
      postData = {
        ID: this.paymentSettingId,
        AccountNumber: this.formGroup.value.AccountNumber,
        BankName: this.formGroup.value.BankName,
        BankAccountName: this.formGroup.value.BankAccountName,
        IFSCCode: this.formGroup.value.IFSCCode,
        UPI: this.formGroup.value.UPI,
        DistributorCode: this.formGroup.value.DistributorCode
      };

      this.apiService
        .postApiOnlyWithContentType(
          'api/payment_setting/add',
          postData
        )
        .subscribe((result) => {
          if (result === true) {
            if (this.paymentSettingId === 0) {
              this.alertDialogs.successAlert('', "Record Inserted successfully...!");
            }
            else {
              this.alertDialogs.successAlert('', "Record Updated successfully...!");
            }
          }
        });
    }
  }
}