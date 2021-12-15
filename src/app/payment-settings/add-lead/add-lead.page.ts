import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  providers: [NetworkProviderService, Network]
})

export class AddLeadPage implements OnInit {
  formGroup!: FormGroup;
  public AccountNumber: any;
  public saveEditButton = 'Save';
  public paymentSettingId = 0;
  public DistributorCode: String;
  public distributorList: any[];
  public mandateList: any[];
  public statusList: any[];
  public accounttypeList: any[];
  public scannedFile:any;
  public confirmationFile:any;
  public pageTitle:"E-cheque/E-nach Leads"

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertDialogs: AlertDialogs,
    private router: Router

  ) { }

  ngOnInit():void { 
    this.createForm();
    this.pageTitle="E-cheque/E-nach Leads"
  }

  /*same as resume */
	ionViewDidEnter() {
		this.getmandatelist();
    this.getstatuslist();
    this.getaccounttypelist();
	}  

  createForm(): any {
		this.formGroup = this.formBuilder.group({
			DistributorFirstName: ['', Validators.required],			
      DistributorLastName:['', Validators.required],
      UserFirstName:['', Validators.required],
      UserLastName:['', Validators.required],
      MobileNumber:['', Validators.required],
      Region:['', Validators.required],
      Email:['', Validators.required],
      MandateType:['', Validators.required],
      MandateForm:[''],
      MailConfirmation:[''],
      ApplicationID:['', Validators.required],
      ApplicationDate:['', Validators.required],
      UMRNNo:[''],
      ApprovalStatus:['', Validators.required],
      BankAccountNo:[0, Validators.required],
      AccountType:['', Validators.required],
      BankIFSCCode:['', Validators.required],
      Frequency:['', Validators.required],
      FirstCollectionDate:['', Validators.required],
      LastCollectionDate:['', Validators.required]
		});

    this.addlead();
	}

  async getmandatelist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/lead_details/MandateList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.mandateList=result
      } 
    });
  }

  async getstatuslist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/lead_details/StatusList'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.statusList=result
      } 
    });
  }

  async getaccounttypelist(){    
    this.apiService
    .getApiwithoutauthencticate(
      'api/company_setting/GetAccountType'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.accounttypeList=result
      } 
    });
  }

  async addlead(){     
    const ashbdf=this.formGroup.valid
  
    if (this.formGroup.valid){   
      let postData;
      postData = {
        DistributorFirstName: this.formGroup.value.DistributorFirstName,
        DistributorLastName:this.formGroup.value.DistributorFirstName,
        UserFirstName:this.formGroup.value.UserFirstName,
        UserLastName:this.formGroup.value.UserLastName,
        MobileNumber:this.formGroup.value.MobileNumber,
        Region:this.formGroup.value.Region,
        Email:this.formGroup.value.Email,
        MandateType:this.formGroup.value.MandateType,
        ScannedFilePath:this.formGroup.value.ScannedFilePath,
        ConfirmationFilePath:this.formGroup.value.ConfirmationFilePath,
        ApplicationID:this.formGroup.value.ApplicationID,
        ApplicationDate:this.formGroup.value.ApplicationDate,
        UMRNNo:this.formGroup.value.UMRNNo,
        ApprovalStatus:this.formGroup.value.ApprovalStatus,
        BankAccountNo:this.formGroup.value.BankAccountNo,
        AccountType:this.formGroup.value.AccountType,
        BankIFSCCode:this.formGroup.value.BankIFSCCode,
        Frequency:this.formGroup.value.Frequency,
        FirstCollectionDate:this.formGroup.value.FirstCollectionDate,
        LastCollectionDate:this.formGroup.value.LastCollectionDate,
        CreatedBy:"Ganesh"
      };

      let formData = new FormData();
      
      formData.append("scanned_file", this.scannedFile);    
      formData.append("confirmation_file", this.confirmationFile);

      const leadDetails = JSON.stringify(postData)
      formData.append('LeadDetails', leadDetails);

      this.apiService
          .uploadImagePostApiWithoutAuthentication(
            'api/lead_details/add',
            formData
          )
          .subscribe((result) => {
            if (result===true){             
              this.alertDialogs.successAlert('', "Record Inserted successfully...!");           
              this.ngOnInit()   
            }
          });
    }
    
  }

  onconfirmationFileChange(fileChangeEvent) {
    this.confirmationFile = fileChangeEvent.target.files[0];    
  }

  onscannedFileChange(fileChangeEvent) {
    this.scannedFile = fileChangeEvent.target.files[0];    
  }
}