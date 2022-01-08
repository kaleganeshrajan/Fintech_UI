import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { FormGroup,FormBuilder} from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-mandates',
  templateUrl: './my-mandates.page.html',
  styleUrls: ['./my-mandates.page.scss'],
  providers: [NetworkProviderService, Network]
})

export class MyMandatesPage implements OnInit {
  formGroup!: FormGroup;
  public pageTitle:any
  public mandatesDetails:any
  public confirm_box:any

  constructor(
    private apiService: ApiService,
    private alertDialogs: AlertDialogs,
    public alertCtrl: AlertController

  ) { }

  ngOnInit():void { 
    this.pageTitle="My Mandates";
    //this.createForm();
    this.getmandatelist();
  }

  /*same as resume */
	ionViewDidEnter() {}  

  async getmandatelist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/my_mandates/GetMyMandateDetails'
    )
    .subscribe((result) => {        
      if (result!== null) {       
        this.mandatesDetails=result
      } 
    });
  }

  async update(type,id,notificationcheck,priorDays,setAsDefault,cancelMandates,UMRN_no,distributorCode){    
    
    let postData;
      postData = {
        ID:id,
        NotificationSetting  			      :notificationcheck,						
        PriorDays:parseInt(priorDays),
        SetAsDefault:(type == 1 || type == 3)?setAsDefault:true,
        CancelMandates:(type == 1 || type == 2)? cancelMandates:false,
        DistributorCode:distributorCode
      };
      if (type==3){
      this.confirm_box=await this.alertCtrl.create({
        header: 'Prompt Alert',
        message: "You have Initiated mandate cancellation for UMRN "+UMRN_no+" Please confirm if you want to proceed. <b> Note: This action cannot be reversed.</b>",        
        buttons: [
          {
            text: 'No',
            handler: (data: any) => {
            }
          },
          {
            text: 'Yes',
            handler: (data: any) => {              
              this.updatemandate(type,postData);
            }
          }
        ]
      });

      await this.confirm_box.present();
    }
    else{
      this.updatemandate(type,postData);
    }
  }

  async updatemandate(type,postData) { 
      this.apiService
        .postApiOnlyWithContentType(
          'api/my_mandates/UpdateMandate',
          postData
        )
        .subscribe((result) => {
          if (result===true){
            if(type==3){
              this.alertDialogs.alertDialog('', "Your mandate cancellation requet has been submitted. You can check the cancellation status on this page once your cancellation request has been processed.");
            }else if(type==1){
              this.alertDialogs.alertDialog('Success', "Record Updated successfully...!");
            }
            
            this.getmandatelist()
          }
        });
	}
}