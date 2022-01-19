import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { DatePipe } from '@angular/common'
import { AlertController } from '@ionic/angular';
import TableToExcel from "@stanlystark/table-to-excel";

@Component({
	selector: 'app-scheduled-payment',
	templateUrl: './scheduled-payment.page.html',
	styleUrls: ['./scheduled-payment.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class ScheduledPaymentPage implements OnInit {
	formGroup!: FormGroup;
	public DateFilterList: any[]
	public SearchFilterList: any[];
	public InvoiceList: any[];
	public DetailedInvoiceList: any[];
	public InvoiceDetails: any[];
	public saveUpdateButton = 'Save';
	public currentDate: any;
	public firstDay: any;
	public OTP: string = '';
	public confirm_box: any
	public isSelectInv = true;
	public isViewInvDetails = false;
	public modifyButton = false;
	public d = new Date();
	public totalInvoiceAmt = 0;
	public distributorCode = "3212145666";
	constructor(
		private apiService: ApiService,
		public appConstants: AppConstants,
		private formBuilder: FormBuilder,
		public datepipe: DatePipe,
		private alertDialogs: AlertDialogs,
		public alertCtrl: AlertController
	) { }


	ngOnInit(): void {
		this.createForm();
		this.currentDate = new Date();
		this.firstDay = this.datepipe.transform(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1), 'yyyy-MM-dd')
		this.setDefaultvalue();
	}

	setDefaultvalue() {
		this.formGroup['FromDate'] = this.firstDay
	}

	/*same as resume */
	ionViewDidEnter() {
		this.getAllList()
		this.searchInvoice()
	}

	createForm(): any {
		this.formGroup = this.formBuilder.group({
			ID: [0],
			SearchInvoice: [''],
			FromDate: ['1970-01-01T13:16:54.999+05:30'],
			ToDate: ['2069-01-01T13:16:54.999+05:30'],
			SearchFilterType: [''],
			DateFilterType: [''],
			UpdatedDate: [''],
		});
	}

	async getAllList() {
		let mm = this.d.getMonth() + 1;
		let dd = this.d.getDate();
		let yy = this.d.getFullYear();
		this.formGroup['ToDate'] = yy + '-' + this.getMonth(mm) + '-' + this.getMonth(dd)
		this.d.setMonth(this.d.getMonth() - 1)

		// Get Search Filter Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetSearchFilter"
			).subscribe((result) => {
				if (result != null) {
					this.SearchFilterList = result
				}
			}
			)
		// Get Date Filter Lists
		this.apiService
			.getApiwithoutauthencticate(
				"api/masters/GetDateFilter"
			).subscribe((result) => {
				if (result != null) {
					this.DateFilterList = result
				}
			}
			)
	}

	async searchInvoice() {
		let postData = {
			SearchInvoice: this.formGroup.value.SearchInvoice,
			FromDate: this.formGroup.value.FromDate,
			ToDate: this.formGroup.value.ToDate,
			SearchFilterType: '',
			DateFilterType: this.formGroup.value.DateFilterType,
			DistributorCode: this.distributorCode
		}
		this.apiService
			.postApiOnlyWithContentType(
				"api/schedule_payment/GetInvoiceData"
				, postData
			).subscribe((result) => {
				if (result != null) {
					this.InvoiceList = result;
					let sum = 0
					this.isSelectInv = true;
					this.isViewInvDetails = false;
					for (let i = 0; i < this.InvoiceList.length; i++) {
						sum = sum + this.InvoiceList[i].Amount
					}
					this.totalInvoiceAmt = sum
				}
				else {
					this.alertDialogs.alertDialog('Invoice data', 'No data found!')
				}
			})
		// console.log("PostData", postData)
	}

	viewDetailedInvoive(id) {
		// console.log(id)
		this.InvoiceDetails = []
		this.InvoiceDetails.push(this.InvoiceList.find(ele => ele.ID == id))
		this.isSelectInv = false;
		this.isViewInvDetails = true;
	}

	modifyDate(id) {
		this.modifyButton = true
		console.log()
	}

	async updateDate(id) {
		// console.log(id, ":", this.formGroup.value['UpdatedDate']) ekch object rahil sagli kade asa code karayacha...
		let index = this.InvoiceList.findIndex(ele => ele.ID == id)
		this.InvoiceList[index]['DueDate'] = new Date(this.formGroup.value['UpdatedDate']).toISOString()
		this.InvoiceDetails[0]['DueDate'] = new Date(this.formGroup.value['UpdatedDate']).toISOString()
		this.InvoiceDetails[0]['PaymentMode'] = 'echeque'
		this.InvoiceDetails[0]['PaymentStatus'] = 'inprocess'
		let postData = this.InvoiceDetails[0]
		this.apiService
			.postApiOnlyWithContentType(
				'api/schedule_payment/ModifyDate',
				postData
			)
			.subscribe((result) => {
				if (result != null) {
					this.viewDetailedInvoive(id)
					this.alertDialogs.alertDialog("Date changed!", "Cheque date updated!")
				}
				else {
					this.alertDialogs.alertDialog("Error Caught!", "error")
				}
			})
		// this.alertDialogs.alertDialog("Date changed!", "Cheque date updated!")
	}

	async cancelCheque(id) {
		this.confirm_box = await this.alertCtrl.create({
			header: 'Cancel Cheque',
			message: "Do you really want to cancel this cheque?",
			buttons: [
				{
					text: 'CANCEL',
					handler: (data: any) => {
					}
				},
				{
					text: 'YES',
					handler: () => {
						this.apiService
							.getApiwithoutauthencticate(
								'api/schedule_payment/CancelScheduledInvoice/' + id
							)
							.subscribe((result) => {
								if (result != null) {
									this.backClick()
									this.alertDialogs.alertDialog("Cheque Cancelled!", "Cheque Cancelled!")
								}
								else {
									this.alertDialogs.alertDialog("Error Caught!", "error")
								}
							})
					}
				}
			]
		});
		await this.confirm_box.present();
	}

	parseDate(dateStr) {
		return new Date(dateStr).toLocaleDateString("es-CL")
	}

	getMonth(mm) {
		if (mm < 10) {
			return "0" + mm
		}
		return "" + mm
	}

	backClick() {
		this.isSelectInv = true;
		this.isViewInvDetails = false;
		this.searchInvoice()
	}

	downloadExcel() {
		TableToExcel.convert(document.getElementById("table-to-xls"), {
			name: '' + new Date().getTime() + ".xlsx",
			sheet: {
				name: "Sheet1"
			},
		});
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

			this.formGroup.patchValue({
				FromDate: ids
			});
		}
	}
}
