import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { NetworkProviderService } from 'src/app/utility/network-provider.service';
import { ApiService } from 'src/app/utility/api.service';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { AlertDialogs } from 'src/app/utility/alert-dialogs';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common'

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
  public pageTitle:any;
  public isAddLead:any;
  public isLeadFilter:any;
  public leadDetails:any[];
  public distributornameList:any;
  public currentDate: any;
  public firstDay:any;
  public isScannedMandates:boolean;
  public viewLeadDetails:any;
  public minDate:any;
  public maxDate:any;
  public confirm_box:any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertDialogs: AlertDialogs,
    public datepipe: DatePipe,
    public alertCtrl: AlertController
  ) { }

  ngOnInit():void { 
    this.viewLeadDetails=[]
    this.createForm();
    this.pageTitle="E-cheque/E-nach Leads"
    this.isAddLead=false
    this.isLeadFilter=true
    this.saveEditButton = 'Add Lead'    
    this.getDistributorList()
    
    this.currentDate = new Date();
    this.firstDay =this.datepipe.transform(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1), 'yyyy-MM-dd') //.toString("yyyy-MM-dd").slice(0,10);
    this.scannedFile=""
    this.confirmationFile=""
    this.setDefaultvalue()
    this.getLeaddetails()
  }

  setDefaultvalue(){
    var currentDateinstring=this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')//.toISOString().slice(0,10)
    // this.minDate=currentDateinstring
    this.maxDate=currentDateinstring
    this.formGroup['FilterNoEntry']="10"
    this.formGroup['FilterToDate']=currentDateinstring;
    this.formGroup['FilterFromDate']=this.firstDay//this.firstDay.toISOString();
    this.formGroup['ApplicationDate']=currentDateinstring
    this.formGroup['FirstCollectionDate']=currentDateinstring
    this.formGroup['LastCollectionDate']=currentDateinstring
    this.formGroup['MandateType']="PY"
    this.formGroup['Frequency']="As and when presented"
    this.formGroup.patchValue({
      FilterToDate: currentDateinstring, 
      FilterFromDate:this.firstDay, //this.firstDay.toISOString(),
      ApplicationDate:currentDateinstring,
      FirstCollectionDate:currentDateinstring,
      LastCollectionDate:currentDateinstring,
      FilterNoEntry:"10",
      Frequency:"As and when presented",
      MandateType:"PY"
    });
  }

  fromDatechange(ids){     
    var from_date=new Date(ids)
    var to_date=new Date(this.formGroup['FilterToDate'])
    this.formGroup['FilterFromDate']=ids;
    if (from_date.getDate()>to_date.getDate()){
      this.formGroup['FilterToDate']=ids;
      this.formGroup.patchValue({
        FilterToDate:ids
      });
    }
    
    this.formGroup.patchValue({
      FilterFromDate: ids
    });
  }

	ionViewDidEnter() {
		this.getmandatelist();
    this.getstatuslist();
    this.getaccounttypelist();
	}  

  createForm(): any {
		this.formGroup = this.formBuilder.group({
			DistributorFirstName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+'),Validators.maxLength(10)]],			
      DistributorLastName:['', [Validators.required,Validators.pattern('[a-zA-Z ]+'),Validators.maxLength(10)]],
      DistributorCode:['', [Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(10)]],
      UserFirstName:['', [Validators.required,Validators.pattern('[a-zA-Z ]+'),Validators.maxLength(10)]],
      UserLastName:['', [Validators.required,Validators.pattern('[a-zA-Z ]+'),Validators.maxLength(10)]],
      MobileNumber:['', [Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(10)]],
      Region:['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+'),Validators.maxLength(20)]],
      Email:['', [Validators.required,Validators.email]],
      MandateType:['', Validators.required],
      MandateForm:['',Validators.required],
      MailConfirmation:[''],
      ApplicationID:['', [Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(10)]],
      ApplicationDate:['', Validators.required],
      UMRNNo:['',[Validators.pattern('[0-9]+'),Validators.maxLength(10)]],
      ApprovalStatus:['', Validators.required],
      BankAccountNo:[0, [Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(20)]],
      AccountType:['', Validators.required],
      BankIFSCCode:['', [Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(11),Validators.minLength(11)]],
      Frequency:['', Validators.required],
      FirstCollectionDate:['', Validators.required],
      LastCollectionDate:['', Validators.required],

      FilterApproveStatus:[''],
      FilterDistributorName:[''],
      FilterNoEntry:[''],
      FilterFromDate:[''],
      FilterToDate:[''],
      FilterDownloadFormat:['']
		});

    //this.addlead();
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
      'api/masters/GetStatus/Lead'
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
    this.validateForm()
    if (this.formGroup.valid){
      // if (this.scannedFile==""){
      //   this.alertDialogs.alertDialog('Error', "Please upload scanned mandate form");     
      //   return
      // }
       
      let postData;
      postData = {
        ID:this.leadId,
        DistributorFirstName:this.saveEditButton!="Add Lead"? this.formGroup['DistributorFirstName']:this.formGroup.value.DistributorFirstName,
        DistributorLastName:this.saveEditButton!="Add Lead"? this.formGroup['DistributorLastName'] : this.formGroup.value.DistributorLastName,
        DistributorCode:this.saveEditButton!="Add Lead"? this.formGroup['DistributorCode'] : this.formGroup.value.DistributorCode,
        UserFirstName:this.saveEditButton!="Add Lead"? this.formGroup['UserFirstName'] : this.formGroup.value.UserFirstName,
        UserLastName:this.saveEditButton!="Add Lead"? this.formGroup['UserLastName'] : this.formGroup.value.UserLastName,
        MobileNumber:this.saveEditButton!="Add Lead"? this.formGroup['MobileNumber'] : this.formGroup.value.MobileNumber,
        Region:this.saveEditButton!="Add Lead"? this.formGroup['Region'] :this.formGroup.value.Region,
        Email:this.saveEditButton!="Add Lead"? this.formGroup['Email'] : this.formGroup.value.Email,
        MandateType:this.saveEditButton!="Add Lead"? this.formGroup['MandateType'] : this.formGroup.value.MandateType,        
        ApplicationID:this.saveEditButton!="Add Lead"? this.formGroup['ApplicationID'] : this.formGroup.value.ApplicationID,
        ApplicationDate:this.saveEditButton!="Add Lead"? this.formGroup['ApplicationDate'] : this.formGroup.value.ApplicationDate,
        UMRNNo:this.saveEditButton!="Add Lead"? this.formGroup['UMRNNo'] : this.formGroup.value.UMRNNo,
        ApprovalStatus:this.saveEditButton!="Add Lead"? this.formGroup['ApprovalStatus'] : this.formGroup.value.ApprovalStatus,
        BankAccountNo:this.saveEditButton!="Add Lead"? this.formGroup['BankAccountNo'] : this.formGroup.value.BankAccountNo,
        AccountType:this.saveEditButton!="Add Lead"? this.formGroup['AccountType'] : this.formGroup.value.AccountType,
        BankIFSCCode:this.saveEditButton!="Add Lead"? this.formGroup['BankIFSCCode'] : this.formGroup.value.BankIFSCCode,
        Frequency:this.saveEditButton!="Add Lead"? this.formGroup['Frequency'] : this.formGroup.value.Frequency,
        FirstCollectionDate:this.saveEditButton!="Add Lead"? this.formGroup['FirstCollectionDate'] : this.formGroup.value.FirstCollectionDate,
        LastCollectionDate:this.saveEditButton!="Add Lead"? this.formGroup['LastCollectionDate'] : this.formGroup.value.LastCollectionDate,
        CreatedBy:"Ganesh",
        IsActive:true
      };
      debugger
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

  validateForm() {
    if (this.formGroup.invalid) {
      this.formGroup.controls['DistributorFirstName'].markAsTouched();
      this.formGroup.controls['DistributorLastName'].markAsTouched();
      this.formGroup.controls['DistributorCode'].markAsTouched();
      this.formGroup.controls['UserFirstName'].markAsTouched();
      this.formGroup.controls['UserLastName'].markAsTouched();
      this.formGroup.controls['MobileNumber'].markAsTouched();
      this.formGroup.controls['Region'].markAsTouched();
      this.formGroup.controls['Email'].markAsTouched();
      this.formGroup.controls['MandateType'].markAsTouched();
      this.formGroup.controls['ApplicationID'].markAsTouched();
      this.formGroup.controls['ApplicationDate'].markAsTouched();
      this.formGroup.controls['ApprovalStatus'].markAsTouched();
      this.formGroup.controls['BankAccountNo'].markAsTouched();
      this.formGroup.controls['AccountType'].markAsTouched();
      this.formGroup.controls['BankIFSCCode'].markAsTouched();
      this.formGroup.controls['Frequency'].markAsTouched();
      this.formGroup.controls['FirstCollectionDate'].markAsTouched();
      this.formGroup.controls['LastCollectionDate'].markAsTouched();
      this.formGroup.controls['MandateForm'].markAsTouched();
      
      return;
    }
    // do something else
 }

  async getLeaddetails() {  
		  let postData;      
      postData = {
        recordLimit       :parseInt(this.formGroup.value.FilterNoEntry==""?0:this.formGroup.value.FilterNoEntry),
        approvadStatus    :this.formGroup.value.FilterApproveStatus,						
        distributorName   :this.formGroup.value.FilterDistributorName,  
        fromDate          :this.formGroup.value.FilterFromDate==""?"":this.formGroup.value.FilterFromDate,  
        toDate            :this.formGroup.value.FilterToDate==""?"":this.formGroup.value.FilterToDate,  
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
    this.isScannedMandates=false
    this.isLeadFilter=false
    this.pageTitle="Edit Lead"
    this.saveEditButton="Update Lead"
    var filterleadDetails = this.leadDetails.filter(obj => obj.ID === clickevent)

    this.leadId=clickevent

    this.formGroup.patchValue({
      DistributorFirstName: filterleadDetails[0].DistributorFirstName, 
      DistributorLastName: filterleadDetails[0].DistributorLastName,
      DistributorCode: filterleadDetails[0].DistributorCode,
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
    this.formGroup['DistributorCode']=filterleadDetails[0].DistributorCode
    this.formGroup['UserFirstName']=filterleadDetails[0].UserFirstName
    this.formGroup['UserLastName']=filterleadDetails[0].UserLastName
    this.formGroup['MobileNumber']=filterleadDetails[0].MobileNumber
    this.formGroup['Region']=filterleadDetails[0].Region
    this.formGroup['Email']=filterleadDetails[0].Email
    this.formGroup['MandateType']=filterleadDetails[0].MandateType
    this.formGroup['ApplicationID']=filterleadDetails[0].ApplicationID
    this.formGroup['ApplicationDate']=filterleadDetails[0].ApplicationDate.split("T")[0]
    this.formGroup['UMRNNo']=filterleadDetails[0].UMRNNo
    this.formGroup['ApprovalStatus']=filterleadDetails[0].ApprovalStatus
    this.formGroup['BankAccountNo']=filterleadDetails[0].BankAccountNo
    this.formGroup['AccountType']=filterleadDetails[0].AccountType
    this.formGroup['BankIFSCCode']=filterleadDetails[0].BankIFSCCode
    this.formGroup['Frequency']=filterleadDetails[0].Frequency
    this.formGroup['FirstCollectionDate']=filterleadDetails[0].FirstCollectionDate.split("T")[0]
    this.formGroup['LastCollectionDate']=filterleadDetails[0].LastCollectionDate.split("T")[0]

    this.disabledControl()
  }

  disabledControl(){
    this.formGroup.controls['DistributorFirstName'].disable()
    this.formGroup.controls['DistributorLastName'].disable()
    this.formGroup.controls['DistributorCode'].disable()
    this.formGroup.controls['UserFirstName'].disable()
    this.formGroup.controls['UserLastName'].disable()
    this.formGroup.controls['MobileNumber'].disable()
    this.formGroup.controls['Region'].disable()
    this.formGroup.controls['Email'].disable()
    this.formGroup.controls['MandateType'].disable()
    this.formGroup.controls['ApplicationID'].disable()
    this.formGroup.controls['ApplicationDate'].disable()
    this.formGroup.controls['UMRNNo'].disable()
    this.formGroup.controls['ApprovalStatus'].disable()
    this.formGroup.controls['BankAccountNo'].disable()
    this.formGroup.controls['AccountType'].disable()
    this.formGroup.controls['BankIFSCCode'].disable()
    this.formGroup.controls['Frequency'].disable()
    this.formGroup.controls['FirstCollectionDate'].disable()
    this.formGroup.controls['LastCollectionDate'].disable()
  }

  enabledControl(){
    this.formGroup.controls['DistributorFirstName'].enable()
    this.formGroup.controls['DistributorLastName'].enable()
    this.formGroup.controls['DistributorCode'].enable()
    this.formGroup.controls['UserFirstName'].enable()
    this.formGroup.controls['UserLastName'].enable()
    this.formGroup.controls['MobileNumber'].enable()
    this.formGroup.controls['Region'].enable()
    this.formGroup.controls['Email'].enable()
    this.formGroup.controls['MandateType'].enable()
    this.formGroup.controls['ApplicationID'].enable()
    this.formGroup.controls['ApplicationDate'].enable()
    this.formGroup.controls['UMRNNo'].enable()
    this.formGroup.controls['ApprovalStatus'].enable()
    this.formGroup.controls['BankAccountNo'].enable()
    this.formGroup.controls['AccountType'].enable()
    this.formGroup.controls['BankIFSCCode'].enable()
    this.formGroup.controls['Frequency'].enable()
    this.formGroup.controls['FirstCollectionDate'].enable()
    this.formGroup.controls['LastCollectionDate'].enable()
  }

  onviewClick(id){
    this.viewLeadDetails = this.leadDetails.filter(obj => obj.ID === id)
    this.isAddLead=false
    this.isLeadFilter=false
    this.pageTitle="View Leads"
  }
  
  async ondeleteClick(id){
    this.confirm_box=await this.alertCtrl.create({
      header: 'Prompt Alert',
      message: "Are you sure you want to delete?",        
      buttons: [
        {
          text: 'CANCEL',
          handler: (data: any) => {
          }
        },
        {
          text: 'CONFIRM',
          handler: (data: any) => {              
            this.apiService
              .getApiwithoutauthencticate(
                'api/lead_details/DeleteLead/'+Number(id)
              )
              .subscribe((result) => {        
                if (result!== null) {          
                  if (result===true){
                    // this.alertDialogs.alertDialog('Success', "Lead has been deleted!");     
                    this.getLeaddetails()
                  }
                } 
              });
          }
        }
      ]
    }); 
    await this.confirm_box.present();   
  }

  clearFilter(){
    this.formGroup['FilterApproveStatus']='';
    this.formGroup['FilterDistributorName']='';
    this.formGroup['FilterDownloadFormat']='';
    this.formGroup.patchValue({
      FilterApproveStatus: '', 
      FilterDistributorName: '',
      FilterDownloadFormat:''
    });
    this.getLeaddetails();
  }
  
  onaddLead() {
    var currentDateinstring=this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')//.toISOString().slice(0,10)
    this.isAddLead=true
    this.isLeadFilter=false
    this.pageTitle="Add Lead"
    this.saveEditButton="Add Lead"
    this.isScannedMandates=true
    this.enabledControl()
    this.clearField()
    this.formGroup['ApplicationDate']=currentDateinstring
    this.formGroup['FirstCollectionDate']=currentDateinstring
    this.formGroup['LastCollectionDate']=currentDateinstring
    this.formGroup['MandateType']="PY"
    this.formGroup['Frequency']="As and when presented"
    this.formGroup.patchValue({
      ApplicationDate:currentDateinstring,
      FirstCollectionDate:currentDateinstring,
      LastCollectionDate:currentDateinstring,
      MandateType:"PY",
      Frequency:"As and when presented"
    });
  }
  
  clearField(){
    this.formGroup.patchValue({
      DistributorFirstName: '', 
      DistributorLastName: '',
      DistributorCode:'',
      UserFirstName:''			,
      UserLastName:'',
      MobileNumber:'',
      Region:'',
      Email:'',
      MandateType:'',
      ApplicationID:'',
      ApplicationDate:'',
      UMRNNo:'',
      ApprovalStatus:'',
      BankAccountNo:'',
      AccountType:'',
      BankIFSCCode:'',
      Frequency:'',
      FirstCollectionDate:'',
      LastCollectionDate:''
    });
          
    this.formGroup['DistributorFirstName']=''
    this.formGroup['DistributorLastName']=''
    this.formGroup['DistributorCode']=''    
    this.formGroup['UserFirstName']=''
    this.formGroup['UserLastName']=''
    this.formGroup['MobileNumber']=''
    this.formGroup['Region']=''
    this.formGroup['Email']=''
    this.formGroup['MandateType']=''
    this.formGroup['ApplicationID']=''
    this.formGroup['ApplicationDate']=''
    this.formGroup['UMRNNo']=''
    this.formGroup['ApprovalStatus']=''
    this.formGroup['BankAccountNo']=''
    this.formGroup['AccountType']=''
    this.formGroup['BankIFSCCode']=''
    this.formGroup['Frequency']=''
    this.formGroup['FirstCollectionDate']=''
    this.formGroup['LastCollectionDate']=''
  }

  backClick(){
    this.isAddLead=false
    this.isLeadFilter=true
    this.viewLeadDetails=[]
    this.pageTitle="E-cheque/E-nach Leads"
  }
}

