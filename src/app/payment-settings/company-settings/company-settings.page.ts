import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
	selector: 'app-company-settings',
	templateUrl: './company-settings.page.html',
	styleUrls: ['./company-settings.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class CompanySettingsPage implements OnInit {
	formGroup!: FormGroup;
	public CompanyName: any;
	public CompanyList: any[];
	public EChequeCT: any[];
	public UpiCT: any[];
	public NBCT: any[];
	public AccountType: any[]
	public saveUpdateButton = 'Save';
	public activateBeneficiaryOption = false;
	constructor(
		private apiService: ApiService,
		public appConstants: AppConstants,
		private formBuilder: FormBuilder,
		private alertDialogs: AlertDialogs,
	) { }


	ngOnInit(): void {
		this.createForm();
	}

	/*same as resume */
	ionViewDidEnter() {
		this.getAllList()
	}

	createForm(): any {
		this.formGroup = this.formBuilder.group({
			ID: [0, Validators.required],
			CompanyName: [''],
			AccountNumber: ['', Validators.required],
			BankName: ['', Validators.required],
			BankAccountName: ['', Validators.required],
			IFSCCode: ['', Validators.required],
			AccountType: ['', Validators.required],
			UPI: ['', Validators.required],
			PaymentPeriod: [''],
			ECCollType: ['', Validators.required],
			ECCollValue: ['', Validators.required],
			UCollType: ['', Validators.required],
			UCollValue: ['', Validators.required],
			NBCollType: ['', Validators.required],
			NBCollValue: ['', Validators.required],
			IsBeneficiaryActive: [false, Validators.required],
			IsAllowCollDigiPay: [false, Validators.required],
			EnableECheque: [false, Validators.required],
			EnableUPIColl: [false, Validators.required],
			EnableNetBanking: [false, Validators.required],
			ModifyECByDist: [false, Validators.required],
			ModifyECByComp: [false, Validators.required],
			CancelECByDist: [false, Validators.required],
			CancelECByComp: [false, Validators.required],
		});
	}

	// Beneficiary disabled or enabled
	setBeneficiary() {
		if (this.activateBeneficiaryOption) {
			this.formGroup.controls['IsBeneficiaryActive'].enable()
		}
		else {
			this.formGroup.controls['IsBeneficiaryActive'].disable()
		}
	}

	fieldEnable(field){
		console.log(this.formGroup[field])
		// if (this.formGroup[field]) {
		// 	this.formGroup.controls[field].enable()
		// 	this.formGroup.controls[field].enable()
		// }
		// else {
		// 	this.formGroup.controls[field].disable()
		// 	this.formGroup.controls[field].disable()
		// }
	}

	async getAllList() {
		this.apiService
			.getApiwithoutauthencticate(
				"api/master_payment_setting/CompanyList"
			).subscribe((result) => {
				if (result !== null) {
					this.CompanyList = result
				}
			})
		// Get Account Type
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetAccountType"
			).subscribe((result) => {
				if (result != null) {
					this.AccountType = result
				}
			}
			)
		// Get ECheque Collection Type
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetEChequeCollType"
			).subscribe((result) => {
				if (result != null) {
					this.EChequeCT = result
				}
			}
			)
		// Get UPI Collection Type
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetUPICollType"
			).subscribe((result) => {
				if (result != null) {
					this.UpiCT = result
				}
			}
			)
		// Get Net Banking Collection Type
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetNetBankingCollType"
			).subscribe((result) => {
				if (result != null) {
					this.NBCT = result
				}
			}
			)
	}

	async getCompanySettings() {
		// console.log("Called>>"+this.formGroup.value.CompanyName+"<<")
		if (this.formGroup.value.CompanyName != '' && this.formGroup.value.CompanyName != null && typeof (this.formGroup.value.CompanyName) != 'undefined') {
			this.apiService
				.getApiwithoutauthencticate(
					"api/company_setting/" + this.formGroup.value.CompanyName
				)
				.subscribe((result) => {
					if (result !== null) {
						this.saveUpdateButton = result.ID == 0 ? 'Save' : 'Update';
						this.activateBeneficiaryOption = result.ID == 0 ? false : result.IsBeneficiaryActive
						this.formGroup['ID'] = result.ID
						this.formGroup['CompanyName'] = result.CompanyName
						this.formGroup['AccountNumber'] = result.AccountNumber == 0 ? null : result.AccountNumber
						this.formGroup['BankName'] = result.BankName
						this.formGroup['BankAccountName'] = result.BankAccountName
						this.formGroup['IFSCCode'] = result.IFSCCode
						this.formGroup['AccountType'] = result.AccountType
						this.formGroup['UPI'] = result.UPI
						this.formGroup['PaymentPeriod'] = result.PaymentPeriod
						this.formGroup['ECCollType'] = result.ECCollType
						this.formGroup['ECCollValue'] = result.ECCollValue
						this.formGroup['UCollType'] = result.UCollType
						this.formGroup['UCollValue'] = result.UCollValue
						this.formGroup['NBCollType'] = result.NBCollType
						this.formGroup['NBCollValue'] = result.NBCollValue
						this.formGroup['IsBeneficiaryActive'] = result.IsBeneficiaryActive
						this.formGroup['IsAllowCollDigiPay'] = result.IsAllowCollDigiPay
						this.formGroup['EnableECheque'] = result.EnableECheque
						this.formGroup['EnableUPIColl'] = result.EnableUPIColl
						this.formGroup['EnableNetBanking'] = result.EnableNetBanking
						this.formGroup['ModifyECByDist'] = result.ModifyECByDist
						this.formGroup['ModifyECByComp'] = result.ModifyECByComp
						this.formGroup['CancelECByDist'] = result.CancelECByDist
						this.formGroup['CancelECByComp'] = result.CancelECByComp
						this.setBeneficiary();
					}
				})
		}
	}

	saveUpdateSetting() {
		// console.log(this.formGroup.value)
		let postData = {
			ID: this.formGroup.value.ID,
			CompanyName: this.formGroup.value.CompanyName,
			AccountNumber: this.formGroup.value.AccountNumber,
			BankName: this.formGroup.value.BankName,
			BankAccountName: this.formGroup.value.BankAccountName,
			IFSCCode: this.formGroup.value.IFSCCode,
			AccountType: this.formGroup.value.AccountType,
			UPI: this.formGroup.value.UPI,
			PaymentPeriod: this.formGroup.value.PaymentPeriod,
			ECCollType: this.formGroup.value.ECCollType,
			ECCollValue: this.formGroup.value.ECCollValue,
			UCollType: this.formGroup.value.UCollType,
			UCollValue: this.formGroup.value.UCollValue,
			NBCollType: this.formGroup.value.NBCollType,
			NBCollValue: this.formGroup.value.NBCollValue,
			IsBeneficiaryActive: this.formGroup.value.IsBeneficiaryActive,
			IsAllowCollDigiPay: this.formGroup.value.IsAllowCollDigiPay,
			EnableECheque: this.formGroup.value.EnableECheque,
			EnableUPIColl: this.formGroup.value.EnableUPIColl,
			EnableNetBanking: this.formGroup.value.EnableNetBanking,
			ModifyECByDist: this.formGroup.value.ModifyECByDist,
			ModifyECByComp: this.formGroup.value.ModifyECByComp,
			CancelECByDist: this.formGroup.value.CancelECByDist,
			CancelECByComp: this.formGroup.value.CancelECByComp,
			CreatedBy: "shubham",
			UpdatedBy: "shubham",
			IsActive: true
		}
		this.apiService
			.postApiOnlyWithContentType(
				"api/company_setting/AddCompanySetting",
				postData
			)
			.subscribe((result) => {
				if (result.Success == true) {
					this.alertDialogs.alertDialog('Success', result.Message);
					this.createForm()
				}
				else {
					this.alertDialogs.alertDialog('Failed', result.Message);
				}
			})
		// this.createForm();
	}
}
