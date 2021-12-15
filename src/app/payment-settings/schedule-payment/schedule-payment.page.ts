import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
	selector: 'app-schedule-payment',
	templateUrl: './schedule-payment.page.html',
	styleUrls: ['./schedule-payment.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class SchedulePaymentPage implements OnInit {
	formGroup!: FormGroup;
	public DateFilter: any[]
	public SearchFilter: any[];
	public InvoiceList: any[];
	public DetailedInvoiceList: any[];
	public InvoiceDetails: any[];
	public saveUpdateButton = 'Save';
	public OTP: string = '';
	public isSelectInv = true;
	public isViewInvDetails = false;
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
			SearchText: ['', Validators.required],
			FromDate: ['', Validators.required],
			ToDate: ['', Validators.required],
			SearchFilterType: ['', Validators.required],
			DateFilterType: ['', Validators.required],
		});
	}


	async getAllList() {
		this.apiService
			.getApiwithoutauthencticate(
				"api/master_payment_setting/CompanyList"
			).subscribe((result) => {
				if (result !== null) {
					console.log("true")
				}
			})
		// Get Account Type Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/company_setting/GetAccountTypeList"
			).subscribe((result) => {
				if (result != null) {
					console.log("true")
				}
			}
			)
	}

	async searchInvoice() {
		let postData = {
			SearchText: this.formGroup.value.SearchText,
			FromDate: this.formGroup.value.FromDate,
			ToDate: this.formGroup.value.ToDate,
			SearchFilterType: this.formGroup.value.SearchFilterType,
			DateFilterType: this.formGroup.value.DateFilterType,
		}
		this.apiService
			.getApiwithoutauthencticate(
				"api/schedule_payment/GetInvoiceData"
			).subscribe((result) => {
				this.InvoiceList = result;
				this.isSelectInv = true;
				this.isViewInvDetails = false;
			})
		console.log("PostData", postData)
	}

	viewDetailedInvoive(id){
		console.log(id)
		this.InvoiceDetails = []
		this.InvoiceDetails.push(this.InvoiceList.find(ele => ele.ID == id))
		this.isSelectInv = false;
		this.isViewInvDetails = true;
	}

}
