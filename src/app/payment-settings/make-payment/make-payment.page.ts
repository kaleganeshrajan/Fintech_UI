import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { DatePipe } from '@angular/common'
import TableToExcel from "@stanlystark/table-to-excel";

@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.page.html',
	styleUrls: ['./make-payment.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class MakePaymentPage implements OnInit {
	formGroup!: FormGroup;
	public DateFilterList: any[]
	public SearchFilterList: any[];
	public InvoiceList: any[];
	public ScheduleInvList: any[];
	public currentDate: any;
	public todayDate: any;
	public minDate: any;
	public maxDate: any;
	public saveUpdateButton = 'Save';
	public isSelectInv = true;
	public isScheduleInv = false;
	public isOTPSent = false;
	public scheduleSuccess = false;
	public totalInvoiceAmt = 0;
	public balanceAmt = 0;
	public transactionId = '';
	public scheduledOn = '';
	public d = new Date();
	public distributorCode = "3212145666";
	public companyCode = "az";
	public disableSearchandDownload = true;
	public dueDateLimit = 0;
	constructor(
		private apiService: ApiService,
		public appConstants: AppConstants,
		private formBuilder: FormBuilder,
		public datepipe: DatePipe,
		private alertDialogs: AlertDialogs,
	) { }


	ngOnInit(): void {
		this.createForm();
		this.currentDate = new Date();
		this.minDate = this.datepipe.transform(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()), 'yyyy-MM-dd')
	}

	/*same as resume */
	ionViewDidEnter() {
		this.checkMandateActive()
		this.getAllList()
		// this.searchInvoice()
	}

	createForm(): any {
		this.formGroup = this.formBuilder.group({
			ID: [0],
			SearchText: [''],
			FromDate: [''],
			ToDate: [''],
			SearchFilterType: [''],
			DateFilterType: [''],
		});
	}

	async checkMandateActive() {
		let postData = {
			distributorCode: this.distributorCode,
			companyCode: this.companyCode
		}
		this.apiService
			.postApiOnlyWithContentType(
				"api/make_payment/CheckMandateActive",
				postData
			)
			.subscribe((result => {
				if (result != null) {
					if (result.Success == true) {
						if (result.Active == true) {
							this.checkPaymentMethod()
						}
						else {
							this.alertDialogs.alertDialog("", result.Message)
						}
					}
					else {
						this.alertDialogs.alertDialog("", result.Message)
					}
				}
				else {
					this.alertDialogs.alertDialog("", "Please refresh!")
				}
			}))

	}

	async checkPaymentMethod() {
		this.apiService
			.getApiwithoutauthencticate(
				"api/make_payment/CheckPaymentMethod/" + this.distributorCode + "/" + this.companyCode
			)
			.subscribe((result => {
				if (result != null) {
					this.InvoiceList = result;
					this.isSelectInv = true;
					this.isScheduleInv = false;
					this.isOTPSent = false;
					this.scheduleSuccess = false;
					this.disableSearchandDownload = false
					this.dueDateLimit = typeof (result[0]['PaymentPeriodLimit']) != 'undefined' ? parseInt(result[0]['PaymentPeriodLimit']) : 31
					let tempDate = new Date()
					tempDate.setDate(tempDate.getDate() + this.dueDateLimit)
					this.maxDate = this.datepipe.transform(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()), 'yyyy-MM-dd')
				}
				else {
					this.alertDialogs.alertDialog("", "No invoices to be scheduled!")
					this.disableSearchandDownload = true
					this.dueDateLimit = 31
				}
			}))
	}

	async getAllList() {
		let mm = this.d.getMonth() + 1;
		let dd = this.d.getDate();
		let yy = this.d.getFullYear();
		this.formGroup['ToDate'] = yy + '-' + this.getMonth(mm) + '-' + this.getMonth(dd)
		this.d.setMonth(this.d.getMonth() - 3)
		mm = this.d.getMonth() + 1;
		dd = this.d.getDate();
		yy = this.d.getFullYear();
		this.formGroup['FromDate'] = yy + '-' + this.getMonth(mm) + '-' + this.getMonth(dd)
		// this.formGroup['FromDate'] = '2021-12-01'
		// Get Search Filter Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetSearchFilter"
			).subscribe((result) => {
				if (result !== null) {
					this.SearchFilterList = result;
				}
			})

		// Get Date Filter Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetDateFilter"
			).subscribe((result) => {
				if (result !== null) {
					this.DateFilterList = result
				}
			})
	}

	async searchInvoice() {
		this.totalInvoiceAmt = 0
		this.balanceAmt = 0
		let invSum = 0
		let balSum = 0
		this.InvoiceList = [];
		let postData = {
			SearchText: this.formGroup.value.SearchText,
			FromDate: this.formGroup.value.FromDate,
			ToDate: this.formGroup.value.ToDate,
			SearchFilterType: this.formGroup.value.SearchFilterType,
			DateFilterType: this.formGroup.value.DateFilterType,
			DistributorCode: this.distributorCode
		}
		this.apiService
			.postApiOnlyWithContentType(
				"api/make_payment/GetInvoiceData"
				, postData
			).subscribe((result) => {
				if (result != null) {
					this.InvoiceList = result;
					this.isSelectInv = true;
					this.isScheduleInv = false;
					this.isOTPSent = false;
					this.scheduleSuccess = false;

					for (let i = 0; i < this.InvoiceList.length; i++) {
						if (this.InvoiceList[i].IsScheduled == true) {
							invSum = invSum + this.InvoiceList[i].Amount
						}
						else {
							balSum = balSum + this.InvoiceList[i].Amount
						}
					}
					this.totalInvoiceAmt = invSum
					this.balanceAmt = balSum
				}
				else {
					this.InvoiceList = [];
					this.alertDialogs.alertDialog("No record", "No record found!")
				}
			})
		console.log("PostData", postData)
	}

	updateInvoiceList(id, valueOf, value) {
		// console.log(id, valueOf, value)
		this.totalInvoiceAmt = 0
		this.balanceAmt = 0
		let invSum = 0
		let balSum = 0
		// if (valueOf == 'DueDate') {
		// 	value = new Date(value).toLocaleDateString()
		// 	// console.log(value)
		// }
		let index = this.InvoiceList.findIndex((obj => obj.ID == id))
		this.InvoiceList[index][valueOf] = value
		for (let i = 0; i < this.InvoiceList.length; i++) {
			if (this.InvoiceList[i].IsScheduled == true) {
				invSum = invSum + this.InvoiceList[i].Amount
			}
			else {
				balSum = balSum + this.InvoiceList[i].Amount
			}
		}
		this.totalInvoiceAmt = invSum
		this.balanceAmt = balSum
	}

	async makePayment() {
		// let postData = {}
		// this.apiService
		// .postApiOnlyWithContentType(
		// 	'',
		// 	postData
		// )
		// .subscribe((result) => {
		// 	if(result != null) {
		// 		console.log(result)
		// 	}
		// 	else{
		// 		this.alertDialogs.alertDialog("","Something to be added")
		// 	}
		// })
		this.alertDialogs.alertDialog("", "Something to be added")
	}

	async schedulePayment() {
		this.ScheduleInvList = []
		this.totalInvoiceAmt = 0
		let sum = 0
		let flag = 0
		let flag_selected = 0
		if (this.InvoiceList.length > 0) {
			for (let i = 0; i < this.InvoiceList.length; i++) {
				if (this.InvoiceList[i].IsScheduled == true) {
					flag_selected = 1
					if (this.InvoiceList[i].DueDate != '' && typeof (this.InvoiceList[i].DueDate) != 'undefined' && this.InvoiceList[i].DueDate != null) {
						this.ScheduleInvList.push(this.InvoiceList[i])
						sum = sum + this.InvoiceList[i].Amount
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
		this.totalInvoiceAmt = sum
	}

	async sendOtp() {
		this.isSelectInv = false;
		this.isScheduleInv = false;
		this.isOTPSent = true;
		this.scheduleSuccess = false;
	}

	async verifyandconfirm() {
		// console.log(this.OTP)
		this.transactionId = '' + new Date().getTime();
		this.scheduledOn = new Date().toISOString()
		for (let i = 0; i < this.ScheduleInvList.length; i++) {
			this.ScheduleInvList[i].ScheduledOn = this.scheduledOn;
			this.ScheduleInvList[i].TransactionID = this.transactionId;
			this.ScheduleInvList[i].PaymentMode = 'echeque'
			this.ScheduleInvList[i].PaymentStatus = 'inprocess'
			this.ScheduleInvList[i].DueDate = new Date(this.ScheduleInvList[i].DueDate).toISOString();
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

	// Parse Date
	parseDate(dateStr) {
		return new Date(dateStr).toLocaleDateString("es-CL")
	}

	getMonth(mm) {
		if (mm < 10) {
			return "0" + mm
		}
		return "" + mm
	}

	// back click
	backClick() {
		this.isSelectInv = true;
		this.isScheduleInv = false;
		this.isOTPSent = false;
		this.scheduleSuccess = false;
	}

	downloadExcel() {
		TableToExcel.convert(document.getElementById("table-to-xls"), {
			name: '' + new Date().getTime() + ".xlsx",
			sheet: {
				name: "Sheet1"
			},
		});
	}

	onCodeChanged(code: string) {
		console.log("Changed:", code)
	}

	// this called only if user entered full code
	onCodeCompleted(code: string) {
		let postData = { "otp": code }
		this.apiService
			.postApiOnlyWithContentType(
				'',
				postData
			)
			.subscribe((result) => {
				console.log(result)
			})
	}

	fromDatechange(ids) {
		var from_date = new Date(ids)
		var to_date = new Date(this.formGroup['ToDate'])
		this.formGroup['FromDate'] = ids;
		if (from_date.getDate() > to_date.getDate()) {
			this.formGroup['ToDate'] = ids;
			this.formGroup.patchValue({
				ToDate: ids
			});
		}

		this.formGroup.patchValue({
			FromDate: ids
		});
	}
}
