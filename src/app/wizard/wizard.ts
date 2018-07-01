import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Router } from '@angular/router';

import{ WizardService } from './wizard.service';
import * as IMAGEURL from '../../shared/img.urls';
import { SharedComponent, DonwloadDialog} from '../sharedModule/shared.component';
import {CompaniesService} from "../companies/companies.service";


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
  damageDetailsData = [];
  damagePartList = [];
  summaryReportData = [];
  postResponseData = [];
  successMessage:string;
  errorMessage:string;
  showError: boolean = false;
  showSuccess: boolean = false;
  caseId: any = localStorage.getItem('CaseID');
  caseNO: any = localStorage.getItem('CaseNO');
//   url:any;
  public files: any[];
  Loader: boolean = true;
  PartStatusID: any ;
  VehicleId = [
    {VehicleId: 0, Name: 'LCV/HCV'},
    {VehicleId: 1, Name: 'HTV/BUS'},
    {VehicleId: 2, Name: 'TWO-Wheeler'},
    {VehicleId: 3, Name: 'CAR'},
    {VehicleId: 4, Name: 'TAXI '}
  ];

  FuelType = [
    {FuelType: '0', Name: 'Diesel'},
    {FuelType: '1', Name: 'Petrol'},
    {FuelType: '2', Name: 'CNG'}
  ];

  LicenseType = [
    {value: '0', viewValue: 'LMV'},
    {value: '1', viewValue: 'M/CYCL.WG'},
    {value: '2', viewValue: 'LMV-TR'},
    {value: '3', viewValue: 'HTV'}
  ];


  submitDisabled: boolean = false;
  companyListData =[];
  thisYear: number = new Date().getFullYear();
  driverAge:number =0;
  CaseVehicleId:any = 0;
  RegSearchSuccessMsg = false;
  RegSearchFailedMsg = false;
  maxDate :any;
  maxDateToday = new Date();
  expiryMinDate:any;
  uploadImageModal:boolean = false;

  constructor(private _formBuilder: FormBuilder, private wizardService:WizardService, private httpClient: HttpClient,
     private router: Router, public dialog: MatDialog, private companyService: CompaniesService)
    {
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
        CaseVehicleId: new FormControl(this.CaseVehicleId),
        SurveyorsId: new FormControl(this.caseId),
        VehicleId: new FormControl(''),
        VehicleName: new FormControl(''),
        Registration_No: new FormControl('', Validators.required),
        ChasisNo:  new FormControl('',Validators.required),
        EngineNo: new FormControl(''),
        FitnessCertifyValidDate: new FormControl('1900-01-01'),
        RegistrationDate: new FormControl(''),
        PermitNo: new FormControl(''),
        TypeofPermit: new FormControl(''),
        Make: new FormControl(''),
        Model: new FormControl(''),
        MgfYear: new FormControl(''),
        Color: new FormControl(''),
        OdometerReading: new FormControl(''),
        Hypo: new FormControl(''),
        RegisteredOwner: new FormControl(''),
        Transfer_Date: new FormControl(''),
        Class_Vehicle: new FormControl(''),
        Pre_Accident_Condition: new FormControl(''),
        Laden_Wt: new FormControl(''),
        Unladen_Wt: new FormControl(''),
        CNG_KIT_Status: new FormControl(''),
        Permit_Area: new FormControl(''),
        Road_Tax_ValidUpto: new FormControl(''),
        FuelType: new FormControl(''),
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
        // FIRDDR: new FormControl(''),
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

    this.eightthFormGroup = new FormGroup({         
        CaseID: new FormControl(this.caseId),
        PartType: new FormControl(''),
        PartID: new FormControl(''),
        PartName: new FormControl(''),
        PartStatus: new FormControl(''),
        PartStatusID: new FormControl(''),
        PartRemark: new FormControl('')
    })

    this.tenthFormGroup = this._formBuilder.group({
        tenthCtrl: ['', Validators.required]
    });
    
   
    var today:any = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth()+1; //January is 0!
    var yyyy:any = today.getFullYear()-18;
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    this.maxDate = today;
   }

   openDialog() {
        const dialogRef = this.dialog.open(DonwloadDialog, {
            height: '300px',
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

    getDriverAge(type: string, event: MatDatepickerInputEvent<Date>){        
        let today = new Date();
        let thisYear = today.getFullYear();
        let selectedDate = event.value;        
        let selectedYear = selectedDate.getFullYear();
        let DriverAge = thisYear - selectedYear;      
        this.fourthFormGroup.controls['Age'].setValue(DriverAge);
    }

    getIssueDate(type: string, event: MatDatepickerInputEvent<Date>){
        let SelectedDate = event.value;
        this.expiryMinDate = SelectedDate;
        this.fourthFormGroup.controls['ValidUptoDate'].setValue('');
    }
    


  ngOnInit() { 
    this.Loader= false;
    this.getCompanyList();
    setTimeout(() => {        
        this.getVehicleDetails();
    },5000);
    setTimeout(() => {
        this.getClaimDetails();
    }, 800);
    setTimeout(() => {
        this.getDriverDetails();
    }, 1100);
    setTimeout(() => {
        this.getAccidentDetails();
    }, 1400);
    setTimeout(() => {
        this.getFirDetails();
    }, 1700);
    setTimeout(() => {
        this.getDetailImage();
    }, 2000);

    setTimeout(() => {
        this.getCrashImage9();
    }, 2250);

    setTimeout(() => {
        this.getCrashImage10();
    }, 2500);

    setTimeout(() => {
        this.getCrashImage11();
    }, 2800);

    setTimeout(() => {
        this.getDriverLicenseImg();
    }, 3050);
    
    setTimeout(() => {
        this.getCrashImage12();
    }, 3400);
    setTimeout(() => {
        this.getSummaryReportDetails();
    }, 4000);
    setTimeout(() => {
        this.getCrashImage13();
    }, 4500);

    setTimeout(() => {
        this.getDamageDetails();
    }, 4700);

    setTimeout(() => {
        this.getClaimFormStatement();
    }, 4900);

    this.seventhFormGroup = this._formBuilder.group({
        seventhCtrl: ['', Validators.required]
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
                    CompanyId: new FormControl(this.claimDetailData[0].CompanyId),
                    InsuredName:  new FormControl(this.claimDetailData[0].InsuredName, Validators.required),
                    InsuredAddress:  new FormControl(this.claimDetailData[0].InsuredAddress, Validators.required),
                    InsuredMobile:  new FormControl(this.claimDetailData[0].InsuredMobile, [Validators.required, Validators.minLength(10)]),
                    EmailID:  new FormControl(this.claimDetailData[0].EmailID, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
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


    SearchRegistration(){ 

        let data= ((document.getElementById("RegistrationNum") as HTMLInputElement).value);       
        this.wizardService.SearchRegistration(data)
        .subscribe(res =>{
            if(res && res.GetVehicleDataResult.status === '200'){
                this.VehicleDetailData = res.GetVehicleDataResult.vehicle;  
                this.RegSearchFailedMsg = false;
                this.RegSearchSuccessMsg = true;
                this.thirdFormGroup.controls['CaseVehicleId'].setValue('');
                this.thirdFormGroup.controls['SurveyorsId'].setValue('');
                this.thirdFormGroup.controls['VehicleId'].setValue('');
                this.thirdFormGroup.controls['VehicleName'].setValue('');
                this.thirdFormGroup.controls['Registration_No'].setValue(data);
                this.thirdFormGroup.controls['RegistrationDate'].setValue(res.GetVehicleDataResult.vehicle.regn_dt);
                this.thirdFormGroup.controls['ChasisNo'].setValue(res.GetVehicleDataResult.vehicle.chasis_no);
                this.thirdFormGroup.controls['EngineNo'].setValue(res.GetVehicleDataResult.vehicle.engine_no);
                this.thirdFormGroup.controls['FitnessCertifyValidDate'].setValue('');
                this.thirdFormGroup.controls['PermitNo'].setValue('');
                this.thirdFormGroup.controls['TypeofPermit'].setValue('');
                this.thirdFormGroup.controls['Make'].setValue(res.GetVehicleDataResult.vehicle.fla_maker_desc);
                this.thirdFormGroup.controls['Model'].setValue(res.GetVehicleDataResult.vehicle.fla_maker_desc);
                this.thirdFormGroup.controls['MgfYear'].setValue(res.GetVehicleDataResult.vehicle.manufaturer_year);
                this.thirdFormGroup.controls['Color'].setValue(res.GetVehicleDataResult.vehicle.color);
                this.thirdFormGroup.controls['OdometerReading'].setValue('');
                this.thirdFormGroup.controls['Hypo'].setValue('');
                this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
                this.thirdFormGroup.controls['Transfer_Date'].setValue('');
                this.thirdFormGroup.controls['Class_Vehicle'].setValue(res.GetVehicleDataResult.vehicle.fla_vh_class_desc);
                this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
                this.thirdFormGroup.controls['Laden_Wt'].setValue('');
                this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
                this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
                this.thirdFormGroup.controls['Permit_Area'].setValue('');
                this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
                this.thirdFormGroup.controls['FuelType'].setValue(res.GetVehicleDataResult.vehicle.fuel_type_desc);
            }
            else{
                this.RegSearchFailedMsg = true;
                this.RegSearchSuccessMsg = false;
                this.thirdFormGroup.controls['Registration_No'].setValue(data);                
                this.thirdFormGroup.controls['CaseVehicleId'].setValue('');
                this.thirdFormGroup.controls['SurveyorsId'].setValue('');
                this.thirdFormGroup.controls['VehicleId'].setValue('');
                this.thirdFormGroup.controls['VehicleName'].setValue('');
                this.thirdFormGroup.controls['RegistrationDate'].setValue('');
                this.thirdFormGroup.controls['ChasisNo'].setValue('');
                this.thirdFormGroup.controls['EngineNo'].setValue('');
                this.thirdFormGroup.controls['FitnessCertifyValidDate'].setValue('');
                this.thirdFormGroup.controls['PermitNo'].setValue('');
                this.thirdFormGroup.controls['TypeofPermit'].setValue('');
                this.thirdFormGroup.controls['Make'].setValue('');
                this.thirdFormGroup.controls['Model'].setValue('');
                this.thirdFormGroup.controls['MgfYear'].setValue('');
                this.thirdFormGroup.controls['Color'].setValue('');
                this.thirdFormGroup.controls['OdometerReading'].setValue('');
                this.thirdFormGroup.controls['Hypo'].setValue('');
                this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
                this.thirdFormGroup.controls['Transfer_Date'].setValue('');
                this.thirdFormGroup.controls['Class_Vehicle'].setValue('');
                this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
                this.thirdFormGroup.controls['Laden_Wt'].setValue('');
                this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
                this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
                this.thirdFormGroup.controls['Permit_Area'].setValue('');
                this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
                this.thirdFormGroup.controls['FuelType'].setValue('');
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
                    SurveyorsId: new FormControl(this.VehicleDetailData[0].SurveyorsId),
                    VehicleId: new FormControl(this.VehicleDetailData[0].VehicleId),
                    VehicleName: new FormControl(this.VehicleDetailData[0].VehicleName),
                    Registration_No: new FormControl(this.VehicleDetailData[0].Registration_No, Validators.required),
                    RegistrationDate: new FormControl(this.VehicleDetailData[0].RegistrationDate, Validators.required),
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
                    Road_Tax_ValidUpto: new FormControl(this.VehicleDetailData[0].Road_Tax_ValidUpto),
                    FuelType: new FormControl(this.VehicleDetailData[0].FuelType)
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
                if(this.driverData[0].DOB !== null){                   
                    let dateString : string = this.driverData[0].DOB.toString();
                    let years : number = parseInt(dateString.substring(0, 5));
                    this.driverAge = this.thisYear - years;
                }
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
                    Age: new FormControl(this.driverAge),
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
                    // FIRDDR: new FormControl(this.accidentData[0].FIRDDR),
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
        this.Loader = true; 
        if(this.firstFormGroup.valid){
            this.wizardService.postClaimDetails(this.firstFormGroup.value).subscribe(res =>{
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
                    this.Loader = false; 	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                    this.Loader = false;
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
            this.Loader = true; 
            this.wizardService.postSurveyorDetails(this.secondFormGroup.value).subscribe(res =>{
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
                    this.Loader = false; 
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                    this.Loader = false;
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
            this.Loader = true; 
            this.wizardService.postVehicleDetails(this.thirdFormGroup.value).subscribe(res =>{
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
                    this.Loader = false; 
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                    this.Loader = false;
                }
            }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                this.Loader = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
            })			
        }
    }

    fourthSubmit(formdata){
        if(this.fourthFormGroup.valid){
            this.Loader = true; 
            this.wizardService.postDriverDetails(this.fourthFormGroup.value).subscribe(res =>{        
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
                    this.Loader = false; 	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                    this.Loader = false;
                }
            }, error =>{
                    this.errorMessage = error;
                    this.showError = true;
                    this.showSuccess = false;
                    this.Loader = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
            })			
        }
    }

    fifthSubmit(formdata){
        if(this.fifthFormGroup.valid){
        this.Loader = true; 
        this.wizardService.postAccidentDetails(this.fifthFormGroup.value).subscribe(res =>{
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
                this.Loader = false; 
            }
            else{
                this.errorMessage = res.Message;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
                this.Loader = false;
            }
        }, error =>{
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                this.Loader = false;
                setTimeout(() => {  
                    this.showError = false;
                }, 3000);
        })			
        }
    }

    sixthSubmit(formdata){
        if(this.sixthFormGroup.valid){
            this.Loader = true; 
            this.wizardService.postFirDetails(this.sixthFormGroup.value).subscribe(res =>{
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
                    this.Loader = false; 	
                }
                else{
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
                    this.Loader = false;
                }
            }, error =>{
                    this.errorMessage = error;
                    this.showError = true;
                    this.showSuccess = false;
                    this.Loader = false;
                    setTimeout(() => {  
                        this.showError = false;
                    }, 3000);
            })			
        }
    }

    getDamageDetails(){ 
        this.Loader = true;
        this.wizardService.GetDamageDetails()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damageDetailsData = res.Data;
                this.Loader = false;               
            }
        })
    }

    getDamagePartList(){
        this.Loader = true; 
        this.uploadImageModal = true;
        this.wizardService.GetDamagePartList()
        .subscribe(res =>{
            if(res && res.Status == 200){
                this.damagePartList = res.Data;
                this.Loader = false;               
            }
        })
    }

    closeImageModal(){
        this.uploadImageModal = false;
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

    eightthStepSubmit(formdata){
        if(this.eightthFormGroup.valid){
            this.Loader = true;
            this.wizardService.PostDamageDetails(this.eightthFormGroup.value).subscribe(res =>{
                if(res && res.Status == 200){
                    this.uploadImageModal = false;
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
                    alert(this.errorMessage);
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

    
    // DETAILS IMAGE //

    createImageFromBlob0(image: Blob) {
        let reader = new FileReader();
        this.imageToShow = 'http://apiflacors.iflotech.in'+image;
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

    // DRIVERLICENSE IMAGE //

    createImageFromBlobD(image: Blob) {
        let reader = new FileReader();
        this.imageToShowD = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChangedD(event: any) {
        this.files = event.target.files;
        this.postDetailImageD();
      }
  
      imageToShowD: any;
      isImageLoadingD:boolean = false;

    postDetailImageD() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.DRIVERLICENSE_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getDriverLicenseImg();
        }, 1000);
        
    }

    getDriverLicenseImg() {
        this.isImageLoadingD = true;
        this.wizardService.getDriverLicenseImg().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.createImageFromBlobD(data.Data[0].Image);
            }
            this.isImageLoadingD = false;
        }, error => {
            this.isImageLoadingD = false;
            console.log(error);
        });
    }

    // Upload Claim Form/Statement //

    createImageFromBlobForm(image: Blob) {
        let reader = new FileReader();
        this.imageToShowForm = 'http://apiflacors.iflotech.in'+image;
    }

    onFileChangedForm(event: any) {
        this.files = event.target.files;
        this.postClaimFormStatement();
      }
  
      imageToShowForm: any;
      isImageLoadingForm:boolean = false;

      postClaimFormStatement() {
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        for (const file of this.files) {
            formData.append(name, file, file.name);
        }
        this.httpClient.post(IMAGEURL.CLAIMFORMSTATEMENT_URL, formData).subscribe(
        res => {
             console.log(res);
        });
        setTimeout(() => {
            this.getClaimFormStatement();
        }, 1000);
        
    }

    getClaimFormStatement() {
        this.isImageLoadingForm = true;
        this.wizardService.getClaimFormStatement().subscribe(data => {
            if(data.Data[0] !== null && data.Data[0] !== undefined){
                this.createImageFromBlobForm(data.Data[0].Image);
            }
            this.isImageLoadingForm = false;
        }, error => {
            this.isImageLoadingForm = false;
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
                this.reateImageFromBlob13(data.Data[0].CustSign);
            }
            this.isImageLoading13 = false;
        }, error => {
            this.isImageLoading13 = false;
            console.log(error);
        });
    }
    
}



