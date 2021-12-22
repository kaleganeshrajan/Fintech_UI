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
  public leadId = 0;
  public DistributorCode: String;
  public distributorList: any[];
  public mandateList: any[];
  public statusList: any[];
  public accounttypeList: any[];
  public scannedFile:any;
  public confirmationFile:any;
  public pageTitle:any
  public isAddLead:any
  public isLeadFilter:any
  public leadDetails:any
  public distributornameList:any

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertDialogs: AlertDialogs

  ) { }

  ngOnInit():void { 
    this.createForm();
    this.pageTitle="E-cheque/E-nach Leads"
    this.isAddLead=false
    this.isLeadFilter=true
    this.saveEditButton = 'Save'
    this.getLeaddetails()
    this.getDistributorList()
  }

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
      LastCollectionDate:['', Validators.required],

      FilterApproveStatus:[''],
      FilterDistributorName:[''],
      FilterNoEntry:[''],
      FilterFromDate:[''],
      FilterToDate:['']
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
      'api/masters/GetAccountType'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.accounttypeList=result
      } 
    });
  }

  async addlead(){    
    if (this.formGroup.valid){   
      let postData;
      postData = {
        ID:this.leadId,
        DistributorFirstName: this.formGroup.value.DistributorFirstName,
        DistributorLastName:this.formGroup.value.DistributorLastName,
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
              if (this.leadId==0){
                this.alertDialogs.alertDialog('Success', "Record Inserted successfully...!");     
              }else{
                this.leadId=0
                this.alertDialogs.alertDialog('Success', "Record Updated successfully...!");     
              }
                    
              this.ngOnInit()   
              this.getLeaddetails()
            }
          });
    }
  }

  async getLeaddetails() {  
		  let postData;      
      postData = {
        recordLimit      :parseInt(this.formGroup.value.FilterNoEntry==""?0:this.formGroup.value.FilterNoEntry),
        approvadStatus  			      :this.formGroup.value.FilterApproveStatus,						
        distributorName              :this.formGroup.value.FilterDistributorName,  
        fromDate                    :this.formGroup.value.FilterFromDate==""?"":this.formGroup.value.FilterFromDate.split("T")[0],  
        toDate                  :this.formGroup.value.FilterToDate==""?"":this.formGroup.value.FilterToDate.split("T")[0],  
      }      
      
      this.apiService
        .postApiOnlyWithContentType(
          'api/lead_details/GetLeads',
          postData
        )
        .subscribe((result) => {
          this.leadDetails=result
        });
	}  

  async getDistributorList(){
    this.apiService
    .getApiwithoutauthencticate(
      'api/lead_details/GetDistributor'
    )
    .subscribe((result) => {        
      if (result!== null) {       
         this.distributornameList=result
      } 
    });
  }

  onconfirmationFileChange(fileChangeEvent) {
    this.confirmationFile = fileChangeEvent.target.files[0];    
  }

  onscannedFileChange(fileChangeEvent) {
    this.scannedFile = fileChangeEvent.target.files[0];    
  }

  oneditClick(clickevent){    
    this.isAddLead=true
    this.isLeadFilter=false
    this.pageTitle="Add Lead"
    this.saveEditButton="Update"
    var filterleadDetails = this.leadDetails.filter(obj => obj.ID === clickevent)

    this.leadId=clickevent

    this.formGroup.patchValue({
      DistributorFirstName: filterleadDetails[0].DistributorFirstName, 
      DistributorLastName: filterleadDetails[0].DistributorLastName,
      UserFirstName:filterleadDetails[0].UserFirstName			,
      UserLastName:filterleadDetails[0].UserLastName              ,
      MobileNumber:filterleadDetails[0].MobileNumber              ,
      Region:filterleadDetails[0].Region                          ,
      Email:filterleadDetails[0].Email                            ,
      MandateType:filterleadDetails[0].MandateType                ,
      ApplicationID:filterleadDetails[0].ApplicationID            ,
      ApplicationDate:filterleadDetails[0].ApplicationDate        ,
      UMRNNo:filterleadDetails[0].UMRNNo                          ,
      ApprovalStatus:filterleadDetails[0].ApprovalStatus          ,
      BankAccountNo:filterleadDetails[0].BankAccountNo            ,
      AccountType:filterleadDetails[0].AccountType                ,
      BankIFSCCode:filterleadDetails[0].BankIFSCCode              ,
      Frequency:filterleadDetails[0].Frequency                    ,
      FirstCollectionDate:filterleadDetails[0].FirstCollectionDate,
      LastCollectionDate:filterleadDetails[0].LastCollectionDate
    });
      
    this.formGroup['DistributorFirstName']=filterleadDetails[0].DistributorFirstName
    this.formGroup['DistributorLastName']=filterleadDetails[0].DistributorLastName
    this.formGroup['UserFirstName']=filterleadDetails[0].UserFirstName
    this.formGroup['UserLastName']=filterleadDetails[0].UserLastName
    this.formGroup['MobileNumber']=filterleadDetails[0].MobileNumber
    this.formGroup['Region']=filterleadDetails[0].Region
    this.formGroup['Email']=filterleadDetails[0].Email
    this.formGroup['MandateType']=filterleadDetails[0].MandateType
    this.formGroup['ApplicationID']=filterleadDetails[0].ApplicationID
    this.formGroup['ApplicationDate']=filterleadDetails[0].ApplicationDate
    this.formGroup['UMRNNo']=filterleadDetails[0].UMRNNo
    this.formGroup['ApprovalStatus']=filterleadDetails[0].ApprovalStatus
    this.formGroup['BankAccountNo']=filterleadDetails[0].BankAccountNo
    this.formGroup['AccountType']=filterleadDetails[0].AccountType
    this.formGroup['BankIFSCCode']=filterleadDetails[0].BankIFSCCode
    this.formGroup['Frequency']=filterleadDetails[0].Frequency
    this.formGroup['FirstCollectionDate']=filterleadDetails[0].FirstCollectionDate
    this.formGroup['LastCollectionDate']=filterleadDetails[0].LastCollectionDate
  }
  
  onaddLead() {
    this.isAddLead=true
    this.isLeadFilter=false
    this.pageTitle="Add Lead"
  }

  backClick(){
    this.isAddLead=false
    this.isLeadFilter=true
    this.pageTitle="E-cheque/E-nach Leads"
  }
}