import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.page.html',
	styleUrls: ['./make-payment.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class MakePaymentPage implements OnInit {
	formGroup!: FormGroup;
	public DateFilter: any[]
	public SearchFilter: any[];
	public InvoiceList: any[];
	public ScheduleInvList: any[];
	public saveUpdateButton = 'Save';
	public OTP: string = '';
	public isSelectInv = true;
	public isScheduleInv = false;
	public isOTPSent = false;
	public scheduleSuccess = false;
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
				"api/make_payment/GetInvoiceData"
			).subscribe((result) => {
				this.InvoiceList = result;
				this.isSelectInv = true;
				this.isScheduleInv = false;
				this.isOTPSent = false;
				this.scheduleSuccess = false;
			})
		// console.log("PostData", postData)
	}

	updateInvoiceList(id, valueOf, value) {
		let index = this.InvoiceList.findIndex((obj => obj.ID == id))
		this.InvoiceList[index][valueOf] = value
	}

	async schedulePayment() {
		this.ScheduleInvList = []
		let flag = 0
		let flag_selected = 0
		if (this.InvoiceList.length > 0) {
			for (let i = 0; i < this.InvoiceList.length; i++) {
				if (this.InvoiceList[i].IsScheduled == true) {
					flag_selected = 1
					if (this.InvoiceList[i].DueDate != '' && typeof (this.InvoiceList[i].DueDate) != 'undefined' && this.InvoiceList[i].DueDate != null) {
						this.ScheduleInvList.push(this.InvoiceList[i])
					}
					else {
						flag = 1
					}
				}
			}
			if (flag_selected != 1) {
				this.ScheduleInvList = []
				this.alertDialogs.alertDialog('No invoice selected', 'Please select a Invoice!')
			}
			else {
				if (flag == 1) {
					this.ScheduleInvList = []
					this.alertDialogs.alertDialog('Due Date', 'Due date of selected invoices must be filled!')
				}
				else {
					this.isSelectInv = false;
					this.isScheduleInv = true;
					this.isOTPSent = false;
					this.scheduleSuccess = false;
				}
			}
		}
		else {
			this.ScheduleInvList = []
			this.alertDialogs.alertDialog('No invoice selected', 'Please select a Invoice!')
		}
	}

	// OTP Controller
	otpController(event, next, prev, index) {
		if (index == 6) {
			console.log("submit")
		}
		if (event.target.value.length < 1 && prev) {
			prev.setFocus()
		}
		else if (next && event.target.value.length > 0) {
			next.setFocus();
		}
		else {
			return 0;
		}
	}

	async sendOtp() {
		this.isSelectInv = false;
		this.isScheduleInv = false;
		this.isOTPSent = true;
		this.scheduleSuccess = false;
	}

	async verifyandconfirm() {
		for (let i = 0; i < this.ScheduleInvList.length; i++) {
			this.ScheduleInvList[i].ScheduledOn = new Date().toISOString();
			this.ScheduleInvList[i].TransactionID = '' + new Date().getTime();
		}
		let postData = this.ScheduleInvList
		this.apiService
			.postApiOnlyWithContentType(
				"api/make_payment/SchedulePayment",
				postData
			)
			.subscribe((result) => {
				if (result.Success == true) {
					this.isSelectInv = false;
					this.isScheduleInv = false;
					this.isOTPSent = false;
					this.scheduleSuccess = true;
				}
				else {
					this.alertDialogs.alertDialog("Payment Not Scheduled", result.Message)
				}
			})
	}
}
