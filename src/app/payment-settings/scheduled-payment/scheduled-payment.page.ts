import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
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
	public OTP: string = '';
	public isSelectInv = true;
	public isViewInvDetails = false;
	public modifyButton = false;
	public d = new Date();
	public totalInvoiceAmt = 0
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
		mm = this.d.getMonth() + 1;
		dd = this.d.getDate();
		yy = this.d.getFullYear();
		this.formGroup['FromDate'] = yy + '-' + this.getMonth(mm) + '-' + this.getMonth(dd)

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
			SearchFilterType: this.formGroup.value.SearchFilterType,
			DateFilterType: this.formGroup.value.DateFilterType,
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

	modifyDate() {
		this.modifyButton = true
	}

	updateDate(id) {
		// console.log(id, ":", this.formGroup.value['UpdatedDate']) ekch object rahil sagli kade asa code karayacha...
		let index = this.InvoiceList.findIndex(ele => ele.ID == id)
		this.InvoiceList[index]['DueDate'] = this.formGroup.value['UpdatedDate']
		this.InvoiceDetails[0]['DueDate'] = this.formGroup.value['UpdatedDate']
		this.apiService
		// .postApiOnlyWithContentType(
		// 	'',
		// 	this.InvoiceList
		// )
		// .subscribe((result) => {
		// 	console.log(result)
		// })
		this.alertDialogs.alertDialog("Date changed!", "Cheque date updated!")
	}

	cancelCheque() {
		this.alertDialogs.alertDialog("Clicked", "Cancel Cheque")
	}

	parseDate(dateStr) {
		return new Date(dateStr).toLocaleDateString()
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
	}

	downloadExcel() {
		TableToExcel.convert(document.getElementById("table-to-xls"), {
			name: '' + new Date().getTime() + ".xlsx",
			sheet: {
				name: "Sheet1"
			},
		});
	}
}
