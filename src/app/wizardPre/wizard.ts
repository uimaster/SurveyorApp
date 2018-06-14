import {Component, OnInit, ViewChild, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import{ PreWizardService } from './wizard.service';
import{ WizardService } from '../wizard/wizard.service';
import * as IMAGEURL from '../../shared/img.urls';
import { DonwloadDialog } from '../sharedModule/shared.component';
import {CompaniesService} from "../companies/companies.service";

@Component({
  selector: 'wizard-selector',
  templateUrl: './wizard.html',
  styleUrls: ['./wizard.scss']
})
export class PreWizardComponent implements OnInit {
  @ViewChild('stepper') stepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eightthFormGroup: FormGroup;
  ninethFormGroup: FormGroup;
  tenthFormGroup: FormGroup;
  caseDetailData = [];
  VehicleDetailData = [];
  insuranceDetailsData = [];
  conclusionData = [];
  damageDetailsData = [];
  damagePartList = [];
  postResponseData = [];
  successMessage:string;
  errorMessage:string;
  showError: boolean = false;
  showSuccess: boolean = false;
  caseId: any = localStorage.getItem('CaseID');
  caseNO: any = localStorage.getItem('CaseNO');
  showPartsList: boolean = false;
  public files: any[];
  Loader: boolean = true;
  VehicleType = [
    {VehicleTypeID: '0', VehicleTypeName: 'LCV/HCV'},
    {VehicleTypeID: '1', VehicleTypeName: 'HTV/BUS'},
    {VehicleTypeID: '2', VehicleTypeName: 'CommeTwo-Wheelerrcial'},
    {VehicleTypeID: '3', VehicleTypeName: 'Private'},
    {VehicleTypeID: '4', VehicleTypeName: 'Taxi '}
  ];

  FuelType = [
    {value: '0', viewValue: 'Diesel'},
    {value: '1', viewValue: 'Petrol'},
    {value: '2', viewValue: 'CNG'}
  ];
  PartStatusID: any ;
  companyListData =[];
  selectedCompany : any;
  submitDisabled: boolean = false;
  

    constructor(private _formBuilder: FormBuilder, private wizardService:PreWizardService, private spotService: WizardService,
        private httpClient: HttpClient,public dialog: MatDialog, private router: Router, private companyService: CompaniesService
    )
    {

    this.firstFormGroup = new FormGroup({
        CaseID: new FormControl(this.caseId),
        CaseNo: new FormControl(''),
        CaseDate: new FormControl(''),
        CaseRefNo: new FormControl(''),
        CaseProposerName: new FormControl(''),
        CompanyID: new FormControl(''),
        CompanyName: new FormControl(''),
        CaseTypeId: new FormControl(''),
        SurveyorsID: new FormControl(''),
        AssignedDateTime:  new FormControl('', Validators.required),
        caseAddress:  new FormControl(''),
        InspectionDate:  new FormControl('',Validators.required),
        InspectionTime:  new FormControl('', Validators.required),
        InspectionLocation:  new FormControl(''),
        InspectionGeoCodes:  new FormControl(''),
        SurveyStatusID:  new FormControl(''),
    });   

    this.thirdFormGroup = new FormGroup({
        CaseID: new FormControl(''),
        VehicleTypeID: new FormControl(''),
        VehicleTypeName: new FormControl(''),
        Registration_No: new FormControl(''),
        ChasisNo: new FormControl(''),
        EngineNo: new FormControl(''),
        Make: new FormControl(''),
        Model: new FormControl(''),
        Variant: new FormControl(''),
        MgfYear: new FormControl(''),
        Color: new FormControl(''),
        RegistrationDate: new FormControl('', Validators.required),
        FuelType: new FormControl(''),
        HypoticatedTo: new FormControl(''),
        OdometerReading: new FormControl(''),
    });    

    this.ninethFormGroup = new FormGroup({
        CaseID: new FormControl(''),
        CaseProposerName: new FormControl(''),
        CurrentInsurerName: new FormControl(''),
        CurrentPolicyNo: new FormControl(''),
        PolicyStartDate:  new FormControl(''),
        PolicyEndDate: new FormControl(''),
        ClaimHistory: new FormControl(''),
        GapInInsurance: new FormControl(''),
        ProposedInsured: new FormControl(''),
        CaseRemarks: new FormControl('')
    });

    this.eightthFormGroup = new FormGroup({         
        CaseID: new FormControl(this.caseId),
        PartType: new FormControl(''),
        PartID: new FormControl(''),
        PartName: new FormControl(''),
        PartStatus: new FormControl(''),
        PartStatusID: new FormControl(2),
        PartRemark: new FormControl('')
    })
    this.tenthFormGroup = new FormGroup({  
               
        CaseID: new FormControl(this.caseId),
        InsuranceRecommeded: new FormControl('', Validators.required),
        ConclusionRemarks: new FormControl('', Validators.required)
    })
   }


  ngOnInit() {
    this.Loader= false;
    setTimeout(() => {        
        this.getCaseDetails();
    }, 200);
    this.getCompanyList();
    setTimeout(() => {
        this.getVehicleDetails();
    }, 500);
    setTimeout(() => {
        this.getInsuranceDetails();
    }, 700);
    setTimeout(() => {
        this.getConclusion();
    }, 900);   
    setTimeout(() => {
        this.getCrashImage13();
    }, 1200);

    setTimeout(() => {
        this.getDamageDetails();
    }, 2000);
    // setTimeout(() => {
    //     this.getDamagePartList();
    // }, 4000);

    
    this.seventhFormGroup = this._formBuilder.group({
       
    });
    
    // this.tenthFormGroup = this._formBuilder.group({
    //     tenthCtrl: ['', Validators.required]
    // });

    
   
   
  }

  openDialog() {
        const dialogRef = this.dialog.open(DonwloadDialog, {
            height: '200px',
            disableClose:true,
            width:"350px"
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    getCompanyList() {
        this.companyService.getCompanyList()
            .subscribe(res =>{
            this.companyListData = res.Data;
        });
    }

    getCaseDetails(){
        this.wizardService.pre_GetCaseDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.caseDetailData = res.Data;
            this.selectedCompany = this.caseDetailData[0].CompanyID;
            if(this.caseDetailData.length > 0){
                this.firstFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    CaseNo: new FormControl(this.caseDetailData[0].CaseNo),
                    CaseDate: new FormControl(this.caseDetailData[0].CaseDate),
                    CaseRefNo: new FormControl(this.caseDetailData[0].CaseRefNo),
                    CaseProposerName: new FormControl(this.caseDetailData[0].CaseProposerName),
                    CompanyID: new FormControl(this.caseDetailData[0].CompanyID),
                    CompanyName: new FormControl(this.caseDetailData[0].CompanyName),
                    CaseTypeId: new FormControl(this.caseDetailData[0].CaseTypeId),
                    SurveyorsID: new FormControl(this.caseDetailData[0].SurveyorsID),
                    AssignedDateTime:  new FormControl(this.caseDetailData[0].AssignedDateTime, Validators.required),
                    caseAddress:  new FormControl(this.caseDetailData[0].caseAddress),
                    InspectionDate:  new FormControl(this.caseDetailData[0].InspectionDate,Validators.required),
                    InspectionTime:  new FormControl(this.caseDetailData[0].InspectionTime, Validators.required),
                    InspectionLocation:  new FormControl(this.caseDetailData[0].InspectionLocation),
                    InspectionGeoCodes:  new FormControl(this.caseDetailData[0].InspectionGeoCodes),
                    SurveyStatusID:  new FormControl(this.caseDetailData[0].SurveyStatusID),
                });
            }
            }
        })
    }

    getVehicleDetails(){ 
        this.wizardService.pre_GetVehicleDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.VehicleDetailData = res.Data;
            if(this.VehicleDetailData.length > 0){
                this.thirdFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    VehicleTypeID: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    VehicleTypeName: new FormControl(this.VehicleDetailData[0].VehicleTypeName),
                    Registration_No: new FormControl(this.VehicleDetailData[0].Registration_No),
                    ChasisNo: new FormControl(this.VehicleDetailData[0].ChasisNo),
                    EngineNo: new FormControl(this.VehicleDetailData[0].EngineNo),
                    Make: new FormControl(this.VehicleDetailData[0].Make),
                    Model: new FormControl(this.VehicleDetailData[0].Model),
                    Variant: new FormControl(this.VehicleDetailData[0].Variant),
                    MgfYear: new FormControl(this.VehicleDetailData[0].MgfYear),
                    Color: new FormControl(this.VehicleDetailData[0].Color),
                    RegistrationDate: new FormControl(this.VehicleDetailData[0].RegistrationDate, Validators.required),
                    FuelType: new FormControl(this.VehicleDetailData[0].FuelType),
                    HypoticatedTo: new FormControl(this.VehicleDetailData[0].HypoticatedTo),
                    OdometerReading: new FormControl(this.VehicleDetailData[0].OdometerReading),
                });
            }
            }
        })
    }

    getInsuranceDetails(){ 
        this.wizardService.pre_GetInsuranceDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.insuranceDetailsData = res.Data;
            if(this.insuranceDetailsData.length > 0){
                this.ninethFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    CaseProposerName: new FormControl(this.insuranceDetailsData[0].CaseProposerName),
                    CurrentInsurerName: new FormControl(this.insuranceDetailsData[0].CurrentInsurerName),
                    CurrentPolicyNo: new FormControl(this.insuranceDetailsData[0].CurrentPolicyNo),
                    PolicyStartDate:  new FormControl(this.insuranceDetailsData[0].PolicyStartDate),
                    PolicyEndDate: new FormControl(this.insuranceDetailsData[0].PolicyEndDate),
                    ClaimHistory: new FormControl(this.insuranceDetailsData[0].ClaimHistory),
                    GapInInsurance: new FormControl(this.insuranceDetailsData[0].GapInInsurance),
                    ProposedInsured: new FormControl(this.insuranceDetailsData[0].ProposedInsured),
                    CaseRemarks: new FormControl(this.insuranceDetailsData[0].CaseRemarks)
                });
            }
            }
        })
    }

    getConclusion(){ 
        this.wizardService.pre_GetConclusion()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.conclusionData = res.Data;  
                if(this.conclusionData.length > 0){
                    this.tenthFormGroup = new FormGroup({         
                        CaseID: new FormControl(this.caseId),
                        InsuranceRecommeded: new FormControl(this.conclusionData[0].InsuranceRecommeded, Validators.required),
                        ConclusionRemarks: new FormControl(this.conclusionData[0].ConclusionRemarks, Validators.required)
                    })
                }  
                else{
                    this.tenthFormGroup = new FormGroup({         
                        CaseID: new FormControl(this.caseId),
                        InsuranceRecommeded: new FormControl('', Validators.required),
                        ConclusionRemarks: new FormControl('', Validators.required)
                    })
                }
            }
        })
    }

    getDamageDetails(){ 
        this.Loader = true;
        this.wizardService.pre_GetDamageDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damageDetailsData = res.Data;
                this.Loader = false;               
            }
        })
    }

    getDamagePartList(){
        this.Loader = true; 
        this.wizardService.pre_GetDamagePartList()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damagePartList = res.Data;
                this.Loader = false;               
            }
        })
    }

    showdamageListData(data){
        this.PartStatusID = localStorage.getItem('PartStatusID')
        this.eightthFormGroup = new FormGroup({         
            CaseID: new FormControl(this.caseId),
            PartType: new FormControl(data.PartType),
            PartID: new FormControl(data.PartID),
            PartName: new FormControl(data.PartName),
            PartStatus: new FormControl(this.PartStatusID),
            PartStatusID: new FormControl(this.PartStatusID),
            PartRemark: new FormControl(data.PartRemark)
        })
    }

    getPartStatusID(event){        
        localStorage.setItem('PartStatusID', event.value);
        this.PartStatusID = localStorage.getItem('PartStatusID')
        this.eightthFormGroup.controls['PartStatusID'].setValue(this.PartStatusID);
    }

    firstStepSubmit(formdata){ 
        if(this.firstFormGroup.valid){
            this.Loader = true;
            this.wizardService.pre_PostCaseDetails(this.firstFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    this.submitDisabled = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
                        this.submitDisabled = false;
                    }, 3000);
                    
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }

    thirdStepSubmit(formdata){
        if(this.thirdFormGroup.valid){
            this.Loader = true;
            this.wizardService.pre_PostVehicleDetails(this.thirdFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    this.submitDisabled = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
                        this.submitDisabled = false;
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }

    ninthStepSubmit(formdata){
        if(this.ninethFormGroup.valid){
            this.Loader = true;
            this.wizardService.pre_PostInsuranceDetails(this.ninethFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    this.submitDisabled = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
                        this.submitDisabled = false;
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }

    tenthStepSubmit(formdata){
        if(this.tenthFormGroup.valid){
            this.Loader = true;
            this.wizardService.pre_PostConclusion(this.tenthFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    this.submitDisabled = true;
                    setTimeout(() => { 
                        this.router.navigate['/dashboard'];
                        this.submitDisabled = false;
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
        this.openDialog();
    }


    eightthStepSubmit(formdata){
        if(this.eightthFormGroup.valid){
            this.Loader = true;
            this.wizardService.pre_PostDamageDetails(this.eightthFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    alert("You have updated part "+ this.successMessage+'lly');
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        // this.stepper.next();
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    alert("You have failed to updated part, "+ this.errorMessage);
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
                this.getDamageDetails();
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                alert("You have failed to updated part, "+ this.errorMessage);
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }
  

    // DIGITAL SIGNATURE IMAGE //
    imageToShow13: any;
    isImageLoading13:boolean = false;

    reateImageFromBlob13(image: Blob) {
        let reader = new FileReader();
        this.imageToShow13 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged13(event: any) {
        this.files = event.target.files;
        this.postCrashImage13();
    }

    postCrashImage13() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.SIGNATURE_URL_PRE, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage13();
        }, 2000);
    }

    getCrashImage13() {        
        this.isImageLoading13 = true;
        this.wizardService.pre_GetSignatureImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob13(data.Data[0].SURVEYORSIGN);
            }
            this.isImageLoading13 = false;
        }, error => {
            this.isImageLoading13 = false;
            console.log(error);
        });
    }

    // openDialog() {
    //     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //         height: '200px',
    //         disableClose:true,
    //         width:"350px"
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log(`Dialog result: ${result}`);
    //     });
    // }

    
}



// @Component({
//     selector: 'dialog-overview-example-dialog',
//     template: '<h2 mat-dialog-title style="color:#000;">Completion Confirmation.</h2> <mat-dialog-content>Do you want to complete the case?</mat-dialog-content> <mat-dialog-actions style="margin-top:20px; margin-left:35px;"><button mat-raised-button mat-dialog-close (click)="closeDialog()">No</button><button mat-raised-button color="primary" (click)="closeDialog()" [mat-dialog-close]="true">Yes</button></mat-dialog-actions>',
//   })
//   export class DialogOverviewExampleDialog{
    
    

//     constructor(
//       public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//       @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  
//       closeDialog(): void {
//       this.dialogRef.close();
//       localStorage.setItem('showDownload', 'true');
//       localStorage.setItem('showTittle', 'false');
//       setTimeout(() => { 
//         this.router.navigate(['/dashboard']);
//         },1000);
//     }

    
  
//   }