import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';

@Component({
	selector: 'app-schedule-payment',
	templateUrl: './schedule-payment.page.html',
	styleUrls: ['./schedule-payment.page.scss'],
	providers: [NetworkProviderService, Network]
})
export class SchedulePaymentPage implements OnInit {
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
			SearchText: [''],
			FromDate: ['1970-01-01T13:16:54.999+05:30'],
			ToDate: ['2069-01-01T13:16:54.999+05:30'],
			SearchFilterType: [''],
			DateFilterType: [''],
		});
	}

	async getAllList() {
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
			SearchText: this.formGroup.value.SearchText,
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
				if(result != null){
				this.InvoiceList = result;
				this.isSelectInv = true;
				this.isViewInvDetails = false;
				}
				else{
					this.alertDialogs.alertDialog('Invoice data', 'No data found!')
				}
			})
		// console.log("PostData", postData)
	}

	viewDetailedInvoive(id){
		// console.log(id)
		this.InvoiceDetails = []
		this.InvoiceDetails.push(this.InvoiceList.find(ele => ele.ID == id))
		this.isSelectInv = false;
		this.isViewInvDetails = true;
	}

	modifyDate(){
		this.alertDialogs.alertDialog("Clicked", "Modify Date")
	}

	cancelCheque(){
		this.alertDialogs.alertDialog("Clicked", "Cancel Cheque")
	}

	downloadReport(){
		this.alertDialogs.alertDialog("Clicked", "Download Report")
	}
	
	parseDate(dateStr) {
		return new Date(dateStr).toLocaleDateString()
	}

	backClick(){
		this.isSelectInv = true;
		this.isViewInvDetails = false;
	}
}
