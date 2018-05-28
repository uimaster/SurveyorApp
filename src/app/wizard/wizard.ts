import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import{ WizardService } from './wizard.service';
import * as IMAGEURL from '../../shared/img.urls';

@Component({
  selector: 'wizard-selector',
  templateUrl: './wizard.html',
  styleUrls: ['./wizard.scss']
})
export class WizardComponent implements OnInit {
  @ViewChild('stepper') stepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eightthFormGroup: FormGroup;
  ninethFormGroup: FormGroup;
  tenthFormGroup: FormGroup;
  claimDetailData = [];
  VehicleDetailData = [];
  driverData = [];
  accidentData = [];
  firData = [];
  summaryReportData = [];
  postResponseData = [];
  successMessage:string;
  errorMessage:string;
  showError: boolean = false;
  showSuccess: boolean = false;
  caseId: any = localStorage.getItem('CaseID');
//   url:any;
  public files: any[];

  

  constructor(private _formBuilder: FormBuilder, private wizardService:WizardService, private httpClient: HttpClient, ) {
    this.files = []; 

    this.firstFormGroup = new FormGroup({
        CaseID: new FormControl(this.caseId),
        CaseNo: new FormControl(''),
        claimNo: new FormControl('', Validators.required),
        policyNo: new FormControl('', Validators.required),
        CompanyId: new FormControl(''),
        InsuredName:  new FormControl('', Validators.required),
        InsuredAddress:  new FormControl('', Validators.required),
        InsuredMobile:  new FormControl('', [Validators.required, Validators.minLength(10)]),
        EmailID:  new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
    });

    this.secondFormGroup = new FormGroup({
        CaseID: new FormControl(this.caseId),
        SurveyorsId: new FormControl('',Validators.required),
        SurveyorsName: new FormControl('', Validators.required),
        DateofAllotmentofsurvey: new FormControl('', Validators.required),
        DateofSurvey: new FormControl(''),
        SurveyLocation:  new FormControl('', Validators.required),
        SurveyGeoCodes: new FormControl('')
    });

    this.thirdFormGroup = new FormGroup({
        CaseVehicleId: new FormControl(''),
        SurveyorsId: new FormControl('', Validators.required),
        VehicleId: new FormControl('', Validators.required),
        VehicleName: new FormControl(''),
        Registration_No: new FormControl('', Validators.required),
        ChasisNo:  new FormControl('',Validators.required),
        EngineNo: new FormControl(''),
        FitnessCertifyValidDate: new FormControl('',Validators.required),
        PermitNo: new FormControl(''),
        TypeofPermit: new FormControl(''),
        Make: new FormControl(''),
        Model: new FormControl(''),
        MgfYear: new FormControl(''),
        Color: new FormControl(''),
        OdometerReading: new FormControl(''),
        Hypo: new FormControl(''),
        RegisteredOwner: new FormControl('',Validators.required),
        Transfer_Date: new FormControl(''),
        Class_Vehicle: new FormControl(''),
        Pre_Accident_Condition: new FormControl(''),
        Laden_Wt: new FormControl(''),
        Unladen_Wt: new FormControl(''),
        CNG_KIT_Status: new FormControl(''),
        Permit_Area: new FormControl(''),
        Road_Tax_ValidUpto: new FormControl('')
    });

    this.fourthFormGroup = new FormGroup({
        CaseDriverID: new FormControl(''),
        CaseID: new FormControl(this.caseId,Validators.required),
        Drivername: new FormControl(''),
        DriverLicenseNo: new FormControl(''),
        IssuingAuthority: new FormControl(''),
        ValidUptoDate:  new FormControl('', Validators.required),
        TypeOfLicense: new FormControl(''),
        PSVBadgeNo: new FormControl(''),
        DOB: new FormControl('',Validators.required),
        Age: new FormControl(''),
        DLEndorsment: new FormControl(''),
        IssueDate: new FormControl('',Validators.required)
    });

    this.fifthFormGroup = new FormGroup({
        CaseID: new FormControl(this.caseId,Validators.required),
        AccidentDate: new FormControl('' ,Validators.required),
        AccidentPlace: new FormControl('' ,Validators.required),
        AllotementDate: new FormControl('' ,Validators.required),
        SurveyDatePlace:  new FormControl(''),
        InsuredRepName: new FormControl(''),
        CauseofLoss: new FormControl(''),
        TPLoss: new FormControl(''),
        FIRDDR: new FormControl(''),
        DetailsTPLoss: new FormControl('')
    });
    this.sixthFormGroup = new FormGroup({
        PoliceFIRID: new FormControl(''),
        CaseID: new FormControl(this.caseId, Validators.required),
        FIRReported: new FormControl(''),
        FIRPoliceStation: new FormControl(''),
        FIRStationDiaryNo: new FormControl(''),
        InjuryToDriver:  new FormControl(''),
        InjuryToCleaner: new FormControl(''),
        InjuryToOtherOccupants: new FormControl(''),
        InjuryToThirdParty: new FormControl(''),
        HospitalDetails: new FormControl(''),
        ThirdPartyPropertyDamages: new FormControl(''),
        FIRDate: new FormControl('1900-01-01',Validators.required),
        Remarks: new FormControl(''),
        ClaimForm: new FormControl(''),
    });

    this.ninethFormGroup = new FormGroup({
        PNo: new FormControl(''),
        CaseID: new FormControl(this.caseId, Validators.required),
        Claimform: new FormControl(''),
        Crashphotos: new FormControl(''),
        Drivinglisence: new FormControl(''),
        Rcbook:  new FormControl(''),
        Surveyfeesbil: new FormControl(''),
        kycdocidentity: new FormControl(''),
        kycdocaddress: new FormControl('')
    });
    
    

   }

  ngOnInit() {
    this.getClaimDetails();
    setTimeout(() => {
        this.getVehicleDetails();
    }, 100);
    setTimeout(() => {
        this.getDriverDetails();
    }, 200);
    setTimeout(() => {
        this.getAccidentDetails();
    }, 300);
    setTimeout(() => {
        this.getFirDetails();
    }, 400);
    setTimeout(() => {
        this.getDetailImage();
    }, 500);
    setTimeout(() => {
        this.getCrashImage1();
    }, 600);
    setTimeout(() => {
        this.getCrashImage2();
    }, 700);
    setTimeout(() => {
        this.getCrashImage3();
    }, 800);
    setTimeout(() => {
        this.getCrashImage4();
    }, 900);
    setTimeout(() => {
        this.getCrashImage5();
    }, 950);
    setTimeout(() => {
        this.getCrashImage6();
    }, 1000);
    setTimeout(() => {
        this.getCrashImage7();
    }, 1100);
    setTimeout(() => {
        this.getCrashImage8();
    }, 1200);

    setTimeout(() => {
        this.getCrashImage9();
    }, 1250);

    setTimeout(() => {
        this.getCrashImage10();
    }, 1300);

    setTimeout(() => {
        this.getCrashImage11();
    }, 1350);

    setTimeout(() => {
        this.getCrashImage12();
    }, 1400);
    setTimeout(() => {
        this.getSummaryReportDetails();
    }, 1500);
    setTimeout(() => {
        this.getCrashImage13();
    }, 4000);

    

    this.seventhFormGroup = this._formBuilder.group({
        seventhCtrl: ['', Validators.required]
    });
    this.eightthFormGroup = this._formBuilder.group({
        eightthCtrl: ['', Validators.required]
    });
    // this.ninethFormGroup = this._formBuilder.group({
    //     ninethCtrl: ['', Validators.required]
    // });
    this.tenthFormGroup = this._formBuilder.group({
        tenthCtrl: ['', Validators.required]
    });

   
  }


    getClaimDetails(){  
        this.wizardService.getClaimDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.claimDetailData = res.Data;
            if(this.claimDetailData.length > 0){
                this.firstFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    CaseNo: new FormControl(''),
                    claimNo: new FormControl(this.claimDetailData[0].ClaimNO, Validators.required),
                    policyNo: new FormControl(this.claimDetailData[0].PolicyNO, Validators.required),
                    CompanyId: new FormControl(''),
                    InsuredName:  new FormControl(this.claimDetailData[0].InsuredName, Validators.required),
                    InsuredAddress:  new FormControl(this.claimDetailData[0].InsuredAddress, Validators.required),
                    InsuredMobile:  new FormControl(this.claimDetailData[0].InsuredMobile, [Validators.required, Validators.minLength(10)]),
                    EmailID:  new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
                });

                this.secondFormGroup = new FormGroup({
                    CaseID: new FormControl(this.caseId),
                    SurveyorsId: new FormControl(this.claimDetailData[0].SurveyorsId, Validators.required),
                    SurveyorsName: new FormControl(this.claimDetailData[0].SurveyorsName, Validators.required),
                    DateofAllotmentofsurvey: new FormControl(this.claimDetailData[0].DateofAllotmentofsurvey, Validators.required),
                    DateofSurvey: new FormControl(this.claimDetailData[0].DateofSurvey),
                    SurveyLocation:  new FormControl(this.claimDetailData[0].SurveyLocation, Validators.required),
                    SurveyGeoCodes: new FormControl(this.claimDetailData[0].SurveyGeoCodes)
                });
            }
            }
        })
    }

    getVehicleDetails(){ 
        this.wizardService.getVehicleDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.VehicleDetailData = res.Data;
            if(this.VehicleDetailData.length > 0){
                this.thirdFormGroup = new FormGroup({
                    CaseVehicleId: new FormControl(this.VehicleDetailData[0].CaseVehicleId),
                    SurveyorsId: new FormControl(this.VehicleDetailData[0].SurveyorsId, Validators.required),
                    VehicleId: new FormControl(this.VehicleDetailData[0].VehicleId, Validators.required),
                    VehicleName: new FormControl(this.VehicleDetailData[0].VehicleName),
                    Registration_No: new FormControl(this.VehicleDetailData[0].Registration_No),
                    ChasisNo:  new FormControl(this.VehicleDetailData[0].ChasisNo, Validators.required),
                    EngineNo: new FormControl(this.VehicleDetailData[0].EngineNo),
                    FitnessCertifyValidDate: new FormControl(this.VehicleDetailData[0].FitnessCertifyValidDate),
                    PermitNo: new FormControl(this.VehicleDetailData[0].PermitNo),
                    TypeofPermit: new FormControl(this.VehicleDetailData[0].TypeofPermit),
                    Make: new FormControl(this.VehicleDetailData[0].Make),
                    Model: new FormControl(this.VehicleDetailData[0].Model),
                    MgfYear: new FormControl(this.VehicleDetailData[0].MgfYear),
                    Color: new FormControl(this.VehicleDetailData[0].Color),
                    OdometerReading: new FormControl(this.VehicleDetailData[0].OdometerReading),
                    Hypo: new FormControl(this.VehicleDetailData[0].Hypo),
                    RegisteredOwner: new FormControl(this.VehicleDetailData[0].RegisteredOwner),
                    Transfer_Date: new FormControl(this.VehicleDetailData[0].Transfer_Date),
                    Class_Vehicle: new FormControl(this.VehicleDetailData[0].Class_Vehicle),
                    Pre_Accident_Condition: new FormControl(this.VehicleDetailData[0].Pre_Accident_Condition),
                    Laden_Wt: new FormControl(this.VehicleDetailData[0].Laden_Wt),
                    Unladen_Wt: new FormControl(this.VehicleDetailData[0].Unladen_Wt),
                    CNG_KIT_Status: new FormControl(this.VehicleDetailData[0].CNG_KIT_Status),
                    Permit_Area: new FormControl(this.VehicleDetailData[0].Permit_Area),
                    Road_Tax_ValidUpto: new FormControl(this.VehicleDetailData[0].Road_Tax_ValidUpto)
                });
            }
            }
        })
    }

    getDriverDetails(){  
        this.wizardService.getDriverDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.driverData = res.Data;
            if(this.driverData.length > 0){
                this.fourthFormGroup = new FormGroup({
                    CaseDriverID: new FormControl(this.driverData[0].CaseDriverID),
                    CaseID: new FormControl(this.driverData[0].CaseID),
                    Drivername: new FormControl(this.driverData[0].Drivername),
                    DriverLicenseNo: new FormControl(this.driverData[0].DriverLicenseNo),
                    IssuingAuthority: new FormControl(this.driverData[0].IssuingAuthority),
                    ValidUptoDate:  new FormControl(this.driverData[0].ValidUptoDate),
                    TypeOfLicense: new FormControl(this.driverData[0].TypeOfLicense),
                    PSVBadgeNo: new FormControl(this.driverData[0].PSVBadgeNo),
                    DOB: new FormControl(this.driverData[0].DOB),
                    Age: new FormControl(this.driverData[0].Age),
                    DLEndorsment: new FormControl(this.driverData[0].DLEndorsment),
                    IssueDate: new FormControl(this.driverData[0].IssueDate)
                });  
            }
            }
        })
    }

    getAccidentDetails(){  
        this.wizardService.geAccidentDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.accidentData = res.Data;     
            if(this.accidentData.length > 0){
                this.fifthFormGroup = new FormGroup({
                    CaseID: new FormControl(this.accidentData[0].CaseID, Validators.required),
                    AccidentDate: new FormControl(this.accidentData[0].AccidentDate ,Validators.required),
                    AccidentPlace: new FormControl(this.accidentData[0].AccidentPlace ,Validators.required),
                    AllotementDate: new FormControl(this.accidentData[0].AllotementDate ,Validators.required),
                    SurveyDatePlace:  new FormControl(this.accidentData[0].SurveyDatePlace),
                    InsuredRepName: new FormControl(this.accidentData[0].InsuredRepName),
                    CauseofLoss: new FormControl(this.accidentData[0].CauseofLoss),
                    TPLoss: new FormControl(this.accidentData[0].TPLoss),
                    FIRDDR: new FormControl(this.accidentData[0].FIRDDR),
                    DetailsTPLoss: new FormControl(this.accidentData[0].DetailsTPLoss)
                });
            }
            }
        })
    }

    getFirDetails(){  
        this.wizardService.geFirDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
            this.firData = res.Data;     
            if(this.firData.length > 0){

                this.sixthFormGroup = new FormGroup({
                    PoliceFIRID: new FormControl(this.firData[0].PoliceFIRID),
                    CaseID: new FormControl(this.caseId, Validators.required),
                    FIRReported: new FormControl(this.firData[0].FIRReported),
                    FIRPoliceStation: new FormControl(this.firData[0].FIRPoliceStation),
                    FIRStationDiaryNo: new FormControl(this.firData[0].FIRStationDiaryNo),
                    InjuryToDriver:  new FormControl(this.firData[0].InjuryToDriver),
                    InjuryToCleaner: new FormControl(this.firData[0].InjuryToCleaner),
                    InjuryToOtherOccupants: new FormControl(this.firData[0].InjuryToOtherOccupants),
                    InjuryToThirdParty: new FormControl(this.firData[0].InjuryToThirdParty),
                    HospitalDetails: new FormControl(this.firData[0].HospitalDetails),
                    ThirdPartyPropertyDamages: new FormControl(this.firData[0].ThirdPartyPropertyDamages),
                    FIRDate: new FormControl(this.firData[0].FIRDate, Validators.required),
                    Remarks: new FormControl(this.firData[0].Remarks),
                    ClaimForm: new FormControl(this.firData[0].ClaimForm),
                });
            }
            }
        })
    }

    getSummaryReportDetails(){  
        this.wizardService.getSummaryReportDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.summaryReportData = res.Data;
                console.log(this.summaryReportData);
                this.ninethFormGroup = new FormGroup({
                    PNo: new FormControl(this.summaryReportData[0].PNo),
                    CaseID: new FormControl(this.caseId),
                    Claimform: new FormControl(this.summaryReportData[0].Claimform),
                    Crashphotos: new FormControl(this.summaryReportData[0].Crashphotos),
                    Drivinglisence: new FormControl(this.summaryReportData[0].Drivinglisence),
                    Rcbook:  new FormControl(this.summaryReportData[0].Rcbook),
                    Surveyfeesbil: new FormControl(this.summaryReportData[0].Surveyfeesbil),
                    kycdocidentity: new FormControl(this.summaryReportData[0].kycdocidentity),
                    kycdocaddress: new FormControl(this.summaryReportData[0].kycdocaddress)
                });
            }
            else{
                console.log(res.Message);
            }
        })
    }

    firstStepSubmit(formdata){ 
        if(this.firstFormGroup.valid){
            this.wizardService.postClaimDetails(this.firstFormGroup.value).subscribe(res =>{
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

    secondStepSubmit(formdata){
        if(this.secondFormGroup.valid){
            this.wizardService.postSurveyorDetails(this.secondFormGroup.value).subscribe(res =>{
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
            this.wizardService.postVehicleDetails(this.thirdFormGroup.value).subscribe(res =>{
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

    fourthSubmit(formdata){
        if(this.fourthFormGroup.valid){
            this.wizardService.postDriverDetails(this.fourthFormGroup.value).subscribe(res =>{        
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

    fifthSubmit(formdata){
        debugger;
        if(this.fifthFormGroup.valid){
        this.wizardService.postAccidentDetails(this.fifthFormGroup.value).subscribe(res =>{
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

    sixthSubmit(formdata){
        if(this.sixthFormGroup.valid){
            this.wizardService.postFirDetails(this.sixthFormGroup.value).subscribe(res =>{
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

    
    
        
    
    // DETAILS IMAGE //

    createImageFromBlob0(image: Blob) {
        let reader = new FileReader();
        this.imageToShow = 'http://apiflacors.iflotech.in'+image;
        console.log(this.imageToShow);
    }

    onFileChanged0(event: any) {
        this.files = event.target.files;
        this.postDetailImage();
      }
  
      imageToShow: any;
      isImageLoading:boolean = false;

    postDetailImage() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.CLAIMPOLICYIMG_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getDetailImage();
        }, 1000);
        
    }

    getDetailImage() {
        this.isImageLoading = true;
        this.wizardService.getDetailImg().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.createImageFromBlob0(data.Data[0].Image);
            }
            this.isImageLoading = false;
        }, error => {
            this.isImageLoading = false;
            console.log(error);
        });
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
        this.wizardService.getFrontCrashImage().subscribe(data => {
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
        this.wizardService.getBackCrashImage().subscribe(data => {
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
        this.wizardService.getLeftFrontCrashImage().subscribe(data => {
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
        this.wizardService.getLeftCrashImage().subscribe(data => {
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
        this.wizardService.getLeftRearCrashImage().subscribe(data => {
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
        this.wizardService.getRightFrontCrashImage().subscribe(data => {
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
        this.wizardService.getRightCrashImage().subscribe(data => {
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
        this.wizardService.getRightRearCrashImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob8(data.Data[0].Image);
            }
            this.isImageLoading8 = false;
        }, error => {
            this.isImageLoading8 = false;
            console.log(error);
        });
    }


    // SUMMARY REPORT KYC ADDRESS //
    imageToShow9: any;
    isImageLoading9:boolean = false;

    reateImageFromBlob9(image: Blob) {
        let reader = new FileReader();
        this.imageToShow9 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged9(event: any) {
        this.files = event.target.files;
        this.postCrashImage9();
    }

    postCrashImage9() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.KYCADDRESS_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage9();
        }, 1000);
    }

    getCrashImage9() {
        this.isImageLoading9 = true;
        this.wizardService.getKycAddressImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob9(data.Data[0].Image);
            }
            this.isImageLoading9 = false;
        }, error => {
            this.isImageLoading9 = false;
            console.log(error);
        });
    }

    // SUMMARY REPORT CLAIM FORM //
    imageToShow10: any;
    isImageLoading10:boolean = false;

    reateImageFromBlob10(image: Blob) {
        let reader = new FileReader();
        this.imageToShow10 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged10(event: any) {
        this.files = event.target.files;
        this.postCrashImage10();
    }

    postCrashImage10() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.CLAIMFORM_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage10();
        }, 1000);
    }

    getCrashImage10() {
        this.isImageLoading10 = true;
        this.wizardService.getClaimFormImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob10(data.Data[0].Image);
            }
            this.isImageLoading10 = false;
        }, error => {
            this.isImageLoading10 = false;
            console.log(error);
        });
    }

    // SUMMARY REPORT SURVEY FEES BILL //
    imageToShow11: any;
    isImageLoading11:boolean = false;

    reateImageFromBlob11(image: Blob) {
        let reader = new FileReader();
        this.imageToShow11 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged11(event: any) {
        this.files = event.target.files;
        this.postCrashImage11();
    }

    postCrashImage11() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.FEESBILLING_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage11();
        }, 1000);
    }

    getCrashImage11() {
        this.isImageLoading11 = true;
        this.wizardService.getSummarySurveyFeeImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob11(data.Data[0].Image);
            }
            this.isImageLoading11 = false;
        }, error => {
            this.isImageLoading11 = false;
            console.log(error);
        });
    }

    // SUMMARY FORM KYC DOC //
    imageToShow12: any;
    isImageLoading12:boolean = false;

    reateImageFromBlob12(image: Blob) {
        let reader = new FileReader();
        this.imageToShow12 = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChanged12(event: any) {
        this.files = event.target.files;
        this.postCrashImage12();
    }

    postCrashImage12() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.KYCDOC_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage12();
        }, 1000);
    }

    getCrashImage12() {
        this.isImageLoading12 = true;
        this.wizardService.getKycDocImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob12(data.Data[0].Image);
            }
            this.isImageLoading12 = false;
        }, error => {
            this.isImageLoading12 = false;
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
        this.httpClient.post(IMAGEURL.SIGNATURE_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getCrashImage13();
        }, 2000);
    }

    getCrashImage13() {
        this.isImageLoading13 = true;
        this.wizardService.getSignatureImage().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.reateImageFromBlob13(data.Data[0].Image);
            }
            this.isImageLoading13 = false;
        }, error => {
            this.isImageLoading13 = false;
            console.log(error);
        });
    }

    
  

}
