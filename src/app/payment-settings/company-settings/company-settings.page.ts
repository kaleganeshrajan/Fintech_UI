import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { AppConstants } from 'src/app/app.constants';
import { Utility } from 'src/app/utility/utility';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.page.html',
  styleUrls: ['./company-settings.page.scss'],
  providers: [NetworkProviderService, Network]
})
export class CompanySettingsPage implements OnInit {

  constructor(
    private apiService: ApiService,
    public appConstants: AppConstants,
  ) { }

  ngOnInit() {}

  /*same as resume */
	ionViewDidEnter() {
    
		// this.postapicall();
	}  

//   async getNotificationTotal1() {
    
// 		this.apiService
// 			.getApiwithoutauthencticate(
// 				'GetDistributors/ganeshk@pharmarack.com'
// 			)
// 			.subscribe((result) => {
// 				// console.log(JSON.stringify(result));
// 				if (result['status'] === 200) {
// 					alert("hello")
// 				} else {
// 					alert("hello")
// 				}
// 			});
// 	}

//   async postapicall(){
//     let postData;
//     postData = {
// 			USERNAME: 'ganeshk@pharmarack.com',
// 			PASSWORD: 'ganesh',
// 			IP: '192.168.1.23'
// 		};

//     this.apiService
// 			.postApiOnlyWithContentType(
// 				'SignIn',
// 				postData
// 			)
// 			.subscribe((result) => {
//           debugger
// 			});
//   }

}
