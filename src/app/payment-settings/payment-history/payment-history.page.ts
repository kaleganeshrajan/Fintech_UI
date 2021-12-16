import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
	selector: 'app-payment-history',
	templateUrl: './payment-history.page.html',
	styleUrls: ['./payment-history.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class PaymentHistoryPage implements OnInit {
	formGroup!: FormGroup;
	public CompanyList: any[]
	public PaymentModeList: any[]
	public PaymentStatusList: any[]
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
			ID: [0],
			Company: [''],
			FromDate: [''],
			ToDate: [''],
			SearchByInvoiceNo: [''],
			SearchByTransactionID: [''],
			PaymentMode: [''],
			PaymentStatus: [''],
		});
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
		// Get Payment Mode Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetPaymentMode"
			).subscribe((result) => {
				if (result != null) {
					this.PaymentModeList = result
				}
			}
			)
		// Get Payment Mode Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetPaymentMode"
			).subscribe((result) => {
				if (result != null) {
					this.PaymentModeList = result
				}
			}
			)
		// Get Payment Mode Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetStatus"
			).subscribe((result) => {
				if (result != null) {
					this.PaymentStatusList = result
				}
			}
			)

	}

	async searchInvoice() {
		let postData = {
			Company: this.formGroup.value.Company,
			FromDate: this.formGroup.value.FromDate,
			ToDate: this.formGroup.value.ToDate,
			SearchByInvoiceNo: this.formGroup.value.SearchByInvoiceNo,
			SearchByTransactionID: this.formGroup.value.SearchByTransactionID,
			PaymentMode: this.formGroup.value.PaymentMode,
			PaymentStatus: this.formGroup.value.PaymentStatus,
		}
		this.apiService
			.getApiwithoutauthencticate(
				"api/payment_history/GetInvoiceData"
			).subscribe((result) => {
				this.InvoiceList = result;
				this.isSelectInv = true;
				this.isViewInvDetails = false;
			})
		console.log("PostData", postData)
	}

	viewDetailedInvoive(id) {
		console.log(id)
		this.InvoiceDetails = []
		this.InvoiceDetails.push(this.InvoiceList.find(ele => ele.ID == id))
		this.isSelectInv = false;
		this.isViewInvDetails = true;
	}

	modifyDate() {
		this.alertDialogs.alertDialog("Clicked", "Modify Date")
	}

	cancelCheque() {
		this.alertDialogs.alertDialog("Clicked", "Cancel Cheque")
	}

	downloadReport() {
		this.alertDialogs.alertDialog("Clicked", "Download Report")
	}

}
