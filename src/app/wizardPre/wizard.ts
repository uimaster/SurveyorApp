import {Component, OnInit, ViewChild, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import{ PreWizardService } from './wizard.service';
import{ WizardService } from '../wizard/wizard.service';
import * as IMAGEURL from '../../shared/img.urls';

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
  showPartsList: boolean = false;
  public files: any[];

  

  constructor(private _formBuilder: FormBuilder, private wizardService:PreWizardService, private spotService: WizardService, private httpClient: HttpClient,
    public dialog: MatDialog, private router: Router)
    {

    this.firstFormGroup = new FormGroup({
        CaseID: new FormControl(this.caseId),
        CaseNo: new FormControl(''),
        CaseDate: new FormControl(''),
        CaseRefNo: new FormControl(''),
        CaseProposerName: new FormControl(''),
        CompanyId: new FormControl(''),
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
    this.getCaseDetails();
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
        this.getCrashImage1();
    }, 1100);
    setTimeout(() => {
        this.getCrashImage2();
    }, 1400);
    setTimeout(() => {
        this.getCrashImage3();
    }, 1600);
    setTimeout(() => {
        this.getCrashImage4();
    }, 1800);
    setTimeout(() => {
        this.getCrashImage5();
    }, 2000);
    setTimeout(() => {
        this.getCrashImage6();
    }, 2200);
    setTimeout(() => {
        this.getCrashImage7();
    }, 2400);
    setTimeout(() => {
        this.getCrashImage8();
    }, 2600);
   
    setTimeout(() => {
        this.getCrashImage13();
    }, 3600);

    setTimeout(() => {
        this.getDamageDetails();
    }, 4000);
    // setTimeout(() => {
    //     this.getDamagePartList();
    // }, 4000);

    
    this.seventhFormGroup = this._formBuilder.group({
       
    });
    
    // this.tenthFormGroup = this._formBuilder.group({
    //     tenthCtrl: ['', Validators.required]
    // });

   
  }


    getCaseDetails(){  
        this.wizardService.pre_GetCaseDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.caseDetailData = res.Data;
            if(this.caseDetailData.length > 0){
                this.firstFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    CaseNo: new FormControl(this.caseDetailData[0].CaseNo),
                    CaseDate: new FormControl(this.caseDetailData[0].CaseDate),
                    CaseRefNo: new FormControl(this.caseDetailData[0].CaseRefNo),
                    CaseProposerName: new FormControl(this.caseDetailData[0].CaseProposerName),
                    CompanyId: new FormControl(this.caseDetailData[0].CompanyId),
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
                    VehicleTypeName: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    Registration_No: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    ChasisNo: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    EngineNo: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    Make: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    Model: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    Variant: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    MgfYear: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    Color: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    RegistrationDate: new FormControl(this.VehicleDetailData[0].VehicleTypeID, Validators.required),
                    FuelType: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    HypoticatedTo: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                    OdometerReading: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
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
        this.wizardService.pre_GetDamageDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damageDetailsData = res.Data;
                console.log("damageDetails:", this.damageDetailsData);                
            }
        })
    }

    getDamagePartList(){ 
        this.wizardService.pre_GetDamagePartList()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damagePartList = res.Data;
                console.log("damageDetails:", this.damagePartList);                
            }
        })
    }

    showdamageListData(data){
        this.eightthFormGroup = new FormGroup({         
            CaseID: new FormControl(this.caseId),
            PartType: new FormControl(data.PartType),
            PartID: new FormControl(data.PartID),
            PartName: new FormControl(data.PartName),
            PartStatus: new FormControl(data.PartStatus),
            PartStatusID: new FormControl(data.PartStatusID || 2),
            PartRemark: new FormControl(data.PartRemark)
        })
    }

    firstStepSubmit(formdata){ 
        if(this.firstFormGroup.valid){
            this.wizardService.pre_PostCaseDetails(this.firstFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
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
            this.wizardService.pre_PostVehicleDetails(this.thirdFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
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
            this.wizardService.pre_PostInsuranceDetails(this.ninethFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
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
            this.wizardService.pre_PostConclusion(this.tenthFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.router['/dashboard'];
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                        this.router.navigate(['/dashboard']);
                    }, 3000);
                }
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

    getpartStatus(event){
        console.log(event);
    }

    eightthStepSubmit(formdata){
        if(this.eightthFormGroup.valid){
            this.wizardService.pre_PostDamageDetails(this.eightthFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.postResponseData = res.Data;        
                    this.successMessage = res.Message;
                    alert(this.successMessage);
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {  
                        this.showSuccess = false;
                        this.stepper.next();
                    }, 3000);	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    alert(this.errorMessage);
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                }
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                alert(this.errorMessage);
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }
  

    // CRASH IMAGES FRONT //

    imageToShow1: any;
    isImageLoading1:boolean = false;

    reateImageFromBlob1(image: Blob) {
        let reader = new FileReader();
        this.imageToShow1 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged1(event: any) {
        this.files = event.target.files;
        this.postCrashImage1();
    }

    postCrashImage1() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.FRONTCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });

        setTimeout(() => {
            this.getCrashImage1();
        }, 1000);
    }

    getCrashImage1() {
        this.isImageLoading1 = true;
        this.spotService.getFrontCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob1(data.Data[0].Image);
            }
            this.isImageLoading1 = false;
        }, error => {
            this.isImageLoading1 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES BACK //

    
    imageToShow2: any;
    isImageLoading2:boolean = false;
    
    reateImageFromBlob2(image: Blob) {
        let reader = new FileReader();
        this.imageToShow2 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged2(event: any) {
        this.files = event.target.files;
        this.postCrashImage2();
    }

    postCrashImage2() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.BACKCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage2();
        }, 1000);
    }

    getCrashImage2() {
        this.isImageLoading2 = true;
        this.spotService.getBackCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob2(data.Data[0].Image);
            }
            this.isImageLoading2 = false;
        }, error => {
            this.isImageLoading2 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES LEFT FRONT //

    imageToShow3: any;
    isImageLoading3:boolean = false;

    reateImageFromBlob3(image: Blob) {
        let reader = new FileReader();
        this.imageToShow3 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged3(event: any) {
        this.files = event.target.files;
        this.postCrashImage3();
    }

    
    postCrashImage3() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.LEFTFRONTCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        
        setTimeout(() => {
            this.getCrashImage3();
        }, 1000);
    }

    getCrashImage3() {
        this.isImageLoading3 = true;
        this.spotService.getLeftFrontCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob3(data.Data[0].Image);
            }
            this.isImageLoading3 = false;
        }, error => {
            this.isImageLoading3 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES LEFT //

    imageToShow4: any;
    isImageLoading4:boolean = false;
    reateImageFromBlob4(image: Blob) {
        let reader = new FileReader();
        this.imageToShow4 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged4(event: any) {
        this.files = event.target.files;
        this.postCrashImage4();
    }

    postCrashImage4() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.LEFTCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
       
        setTimeout(() => {
            this.getCrashImage4();
        }, 1000);
    }

    getCrashImage4() {
        this.isImageLoading4 = true;
        this.spotService.getLeftCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob4(data.Data[0].Image);
            }
            this.isImageLoading4 = false;
        }, error => {
            this.isImageLoading4 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES LEFT REAR //

    imageToShow5: any;
    isImageLoading5:boolean = false;

    reateImageFromBlob5(image: Blob) {
        let reader = new FileReader();
        this.imageToShow5 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged5(event: any) {
        this.files = event.target.files;
        this.postCrashImage5();
    }

    postCrashImage5() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.LEFTREARCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        
        setTimeout(() => {
            this.getCrashImage5();
        }, 1000);
    }

    getCrashImage5() {
        this.isImageLoading5 = true;
        this.spotService.getLeftRearCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob5(data.Data[0].Image);
            }
            this.isImageLoading5 = false;
        }, error => {
            this.isImageLoading5 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES RIGHT FRONT //

    imageToShow6: any;
    isImageLoading6:boolean = false;

    reateImageFromBlob6(image: Blob) {
        let reader = new FileReader();
        this.imageToShow6 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged6(event: any) {
        this.files = event.target.files;
        this.postCrashImage6();
    }
    
    postCrashImage6() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.RIGHTFRONTCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        this.getCrashImage6();
        setTimeout(() => {
            this.getCrashImage6();
        }, 1000);
    }

    getCrashImage6() {
        this.isImageLoading6 = true;
        this.spotService.getRightFrontCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob6(data.Data[0].Image);
            }
            this.isImageLoading6 = false;
        }, error => {
            this.isImageLoading6 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES RIGHT //

    imageToShow7: any;
    isImageLoading7:boolean = false;

    reateImageFromBlob7(image: Blob) {
        let reader = new FileReader();
        this.imageToShow7 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged7(event: any) {
        this.files = event.target.files;
        this.postCrashImage7();
    }

    postCrashImage7() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.RIGHTCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage7();
        }, 1000);
    }

    getCrashImage7() {
        this.isImageLoading7 = true;
        this.spotService.getRightCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob7(data.Data[0].Image);
            }            
            this.isImageLoading7 = false;
        }, error => {
            this.isImageLoading7 = false;
            console.log(error);
        });
    }

    // CRASH IMAGES RIGHT REAR //
    imageToShow8: any;
    isImageLoading8:boolean = false;

    reateImageFromBlob8(image: Blob) {
        let reader = new FileReader();
        this.imageToShow8 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged8(event: any) {
        this.files = event.target.files;
        this.postCrashImage8();
    }

    postCrashImage8() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.RIGHTREARCRASH_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage8();
        }, 1000);
    }

    getCrashImage8() {
        this.isImageLoading8 = true;
        this.spotService.getRightRearCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob8(data.Data[0].Image);
            }
            this.isImageLoading8 = false;
        }, error => {
            this.isImageLoading8 = false;
            console.log(error);
        });
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