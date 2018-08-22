import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router, UrlSegment } from '@angular/router';

import { WizardService } from './wizard.service';
import * as urls from '../../shared/urls';
import { DonwloadDialog } from '../sharedModule/shared.component';
import { CommonImageComponent } from '../sharedModule/images.component';
import { CompaniesService } from '../companies/companies.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { SharedModuleServices } from '../sharedModule/shared.service';
import { GenericGetImageResponseModel } from '../sharedModule/shared.model';


@Component({
  selector: 'wizard-selector',
  templateUrl: './wizard.html',
  styleUrls: ['./wizard.scss']
})
export class WizardComponent implements OnInit {
  @ViewChild('stepper') stepper;
  // @ViewChild('CommonImageComponent') CommonImageComponent: CommonImageComponent;
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
  VehicleSearchData = [];
  driverData = [];
  accidentData = [];
  firData = [];
  damageDetailsData = [];
  damagePartList = [];
  summaryReportData = [];
  postResponseData = [];
  successMessage: string;
  errorMessage: string;
  showError = false;
  showSuccess = false;
  caseId: any = localStorage.getItem('CaseID');
  caseNO: any = localStorage.getItem('CaseNO');
  //   url:any;
  public files: any[];
  Loader = true;
  PartStatusID: any;
  VehicleId = [
    { VehicleId: 1, Name: 'LCV/HCV' },
    { VehicleId: 2, Name: 'HTV/BUS' },
    { VehicleId: 3, Name: 'TWO-Wheeler' },
    { VehicleId: 4, Name: 'CAR' },
    { VehicleId: 5, Name: 'TAXI ' }
  ];

  FuelType = [
    { FuelType: 'PETROL/CNG' },
    { FuelType: 'PETROL/ELECTRIC/HYBRID' },
    { FuelType: 'DIESEL' },
    { FuelType: 'ELECTRIC' },
    { FuelType: 'PETROL/HYBRID' },
    { FuelType: 'PETROL' },
    { FuelType: 'CNG' },
    { FuelType: 'PETROL/LPG' }
  ];

  LicenseType = [
    { value: '0', viewValue: 'LMV' },
    { value: '1', viewValue: 'M/CYCL.WG' },
    { value: '2', viewValue: 'LMV-TR' },
    { value: '3', viewValue: 'HTV' }
  ];

  imageBaseUrl = 'http://apiflav2live.iflotech.in';
  submitDisabled = false;
  companyListData = [];
  thisYear = new Date().getFullYear();
  driverAge = 0;
  CaseVehicleId = 0;
  RegSearchSuccessMsg = false;
  RegSearchFailedMsg = false;
  maxDate: any;
  maxDateToday = new Date();
  expiryMaxDate: any;
  uploadImageModal = false;
  IsCompleted: boolean;
  userList = [];
  createCaseDisabled = false;
  policyEndDate: any;
  StatusData = [];
  showStatusList = false;
  openCreateCaseModal = false;
  imageData: any;
  showSignBroseBtn = true;
  setPolicCtrlDisabled = false;

  // images scr ulrs //

  claimImgUrl: string;
  driverImgUrl: string;
  accidentImgUrl: string;
  summaryClaimImgUrl: string;
  summaryBillImgUrl: string;
  summaryKYCDOCImgUrl: string;
  summaryKYCAddImgUrl: string;
  signatureImgUrl: string;

  constructor(
    private _formBuilder: FormBuilder,
    private wizardService: WizardService,
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private companyService: CompaniesService,
    private dashboardService: DashboardService,
    private imageService: CommonImageComponent,
    private sharedService: SharedModuleServices
  ) {
    this.files = [];
    this.firstFormGroup = new FormGroup({
      CaseID: new FormControl(this.caseId),
      CaseNo: new FormControl(''),
      claimNo: new FormControl('', Validators.required),
      PolicyNO: new FormControl('', Validators.required),
      CompanyId: new FormControl(''),
      Policy_Start_Date: new FormControl(''),
      Policy_End_Date: new FormControl(''),
      Policy_Type: new FormControl(''),
      Policy_Value: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      UserID: new FormControl('', Validators.required),
      InsuredName: new FormControl('', Validators.required),
      InsuredAddress: new FormControl('', Validators.required),
      InsuredMobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      EmailID: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])
    });

    this.secondFormGroup = new FormGroup({
      CaseID: new FormControl(this.caseId),
      SurveyorsId: new FormControl('', Validators.required),
      SurveyorsName: new FormControl('', Validators.required),
      DateofAllotmentofsurvey: new FormControl('', Validators.required),
      DateofSurvey: new FormControl(''),
      SurveyLocation: new FormControl('', Validators.required),
      SurveyGeoCodes: new FormControl('')
    });

    this.thirdFormGroup = new FormGroup({
      CaseVehicleId: new FormControl(this.CaseVehicleId),
      CaseID: new FormControl(JSON.parse(this.caseId)),
      VehicleId: new FormControl(''),
      VehicleName: new FormControl(''),
      Registration_No: new FormControl('', Validators.required),
      ChasisNo: new FormControl('', Validators.required),
      EngineNo: new FormControl(''),
      FitnessCertifyValidDate: new FormControl('1900-01-01'),
      RegistrationDate: new FormControl(''),
      PermitNo: new FormControl(''),
      TypeofPermit: new FormControl(''),
      Make: new FormControl(''),
      Model: new FormControl(''),
      MgfYear: new FormControl(''),
      Color: new FormControl(''),
      OdometerReading: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      Hypo: new FormControl(''),
      RegisteredOwner: new FormControl(''),
      Transfer_Date: new FormControl(''),
      Class_Vehicle: new FormControl(''),
      Pre_Accident_Condition: new FormControl(''),
      Laden_Wt: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      Unladen_Wt: new FormControl('',  Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      CNG_KIT_Status: new FormControl(''),
      Permit_Area: new FormControl(''),
      Road_Tax_ValidUpto: new FormControl(''),
      FuelType: new FormControl(''),
      Seating_Capacity: new FormControl('')
    });

    this.fourthFormGroup = new FormGroup({
      CaseDriverID: new FormControl(0),
      CaseID: new FormControl(JSON.parse(this.caseId), Validators.required),
      Drivername: new FormControl(''),
      DriverLicenseNo: new FormControl(''),
      IssuingAuthority: new FormControl(''),
      ValidUptoDate: new FormControl('', Validators.required),
      TypeOfLicense: new FormControl(''),
      PSVBadgeNo: new FormControl(''),
      DOB: new FormControl('', Validators.required),
      Age: new FormControl(''),
      DLEndorsment: new FormControl(''),
      IssueDate: new FormControl('', Validators.required)
    });

    this.fifthFormGroup = new FormGroup({
      CaseID: new FormControl(this.caseId, Validators.required),
      AccidentDate: new FormControl('', Validators.required),
      AccidentPlace: new FormControl('', Validators.required),
      AllotementDate: new FormControl('', Validators.required),
      SurveyDatePlace: new FormControl(''),
      InsuredRepName: new FormControl(''),
      CauseofLoss: new FormControl(''),
      TPLoss: new FormControl(''),
      // FIRDDR: new FormControl(''),
      DetailsTPLoss: new FormControl('')
    });
    this.sixthFormGroup = new FormGroup({
      PoliceFIRID: new FormControl(0),
      CaseID: new FormControl(JSON.parse(this.caseId), Validators.required),
      FIRReported: new FormControl(''),
      FIRPoliceStation: new FormControl(''),
      FIRStationDiaryNo: new FormControl(''),
      InjuryToDriver: new FormControl(''),
      InjuryToCleaner: new FormControl(''),
      InjuryToOtherOccupants: new FormControl(''),
      InjuryToThirdParty: new FormControl(''),
      HospitalDetails: new FormControl(''),
      ThirdPartyPropertyDamages: new FormControl(''),
      FIRDate: new FormControl(' ', Validators.required),
      Remarks: new FormControl(''),
      ClaimForm: new FormControl('')
    });

    this.ninethFormGroup = new FormGroup({
      PNo: new FormControl(''),
      CaseID: new FormControl(this.caseId, Validators.required),
      Claimform: new FormControl(''),
      Crashphotos: new FormControl(''),
      Drivinglisence: new FormControl(''),
      Rcbook: new FormControl(''),
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
    });

    this.tenthFormGroup = this._formBuilder.group({
      tenthCtrl: ['', Validators.required]
    });

    var today: any = new Date();
    var dd: any = today.getDate();
    var mm: any = today.getMonth() + 1; // January is 0!
    var yyyy: any = today.getFullYear() - 18;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    this.maxDate = today;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DonwloadDialog, {
      height: '300px',
      disableClose: true,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
      key === 55 || key === 48  || key === 57 || key === 186 ));
    if (preventsKey) {
     console.log('Special characters not allowed');
      return false;
    }
  }



  getSpotStepsStatus() {
    let CaseID = this.caseId;
    this.wizardService.getSpotStepsStatus(CaseID).subscribe(res => {
      if (res && res.Data !== null) {
        this.StatusData = res.Data;
        if (this.StatusData[0].CaseCompleteStatus === 'No') {
          this.showStatusList = true;
          this.showError = false;
        } else {
          this.openDialog();
        }
      } else {
        this.errorMessage = 'Server Error!';
        this.showError = true;
        this.showStatusList = false;
      }
    });
  }

  caseStatusModalClose() {
    this.showStatusList = false;
  }

  getCompanyList() {
    this.companyService.getCompanyList().subscribe(res => {
      this.companyListData = res.Data;
    });
  }

  getUserList(data) {
    this.dashboardService.getUserList(data).subscribe(res => {
      this.userList = res.Data;
      // this.firstFormGroup.controls['UserID'].setValue(this.userList[0].UserID);
    });
  }

  getDriverAge(type: string, event: MatDatepickerInputEvent<Date>) {
    let today = new Date();
    let thisYear = today.getFullYear();
    let selectedDate = event.value;
    let selectedYear = selectedDate.getFullYear();
    let DriverAge = thisYear - selectedYear;
    this.fourthFormGroup.controls['Age'].setValue(DriverAge);
  }

  getIssueDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let SelectedDate = event.value;
    this.expiryMaxDate = SelectedDate;
    this.fourthFormGroup.controls['ValidUptoDate'].setValue('');
  }

  getPolicyStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    const SelectedDate = event.value;
    const dateString = new Date(SelectedDate);
    const finalDate = new Date(
      dateString.getFullYear() - 1,
      dateString.getMonth(),
      dateString.getDate()
    );
    this.policyEndDate = finalDate;
    this.firstFormGroup.controls['Policy_End_Date'].setValue('');
  }

  // =========================IMAGES FUNCNTIONS  START============================== //
  postImage(files, typeCode) {
    this.Loader = true;
    const file = files.target.value;
    const ClaimImgPostpayload = {
      CaseID: this.caseId,
      ImageName: '',
      CaseImageCode: typeCode,
      CaseImageID: 1
    };

    const allowedFiles = ['.gif', '.jpg', '.jpeg', '.png'];
    const regex = new RegExp('([a-zA-Z0-9\s_\\.\-:])+(' + allowedFiles.join('|') + ')$');
    if (!regex.exec(file)) {
      alert('Please upload ' + allowedFiles.join(', ') + ' files only.');
      this.Loader = false;
      return false;
    }
    this.imageService.postDetailImage(files, ClaimImgPostpayload);
    this.showSignBroseBtn = false;
    this.Loader = true;
    setTimeout(() => {
      this.getImage(typeCode);
    }, 1000);

  }

  getImage(typeCode) {
    this.Loader = true;
    const ClaimGetPayload = { CaseID: this.caseId, CaseImageCode: typeCode };
    this.sharedService.getImages(ClaimGetPayload).subscribe(
      (res: GenericGetImageResponseModel) => {

        this.imageData = res.Data[0];
        if (res && this.imageData != null) {
          localStorage.setItem('showSignBroseBtn', 'true');
          switch (typeCode) {
            case 'SPCLFRM':
              this.accidentImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPDLNO':
              this.driverImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPPOLICYNO':
              this.claimImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPFEEBILL':
              this.summaryBillImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPKYIDN':
              this.summaryKYCDOCImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPKYADD':
              this.summaryKYCAddImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'SPDSG':
              this.signatureImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            default:
            this.claimImgUrl = this.imageBaseUrl + this.imageData.Image;
          }
          this.Loader = false;
        }
        if (this.signatureImgUrl !== undefined) {
          this.showSignBroseBtn = false;
          this.Loader = false;
        }
      },
      error => {
        this.Loader = false;
        return error;
      }
    );
  }

  // =========================IMAGES FUNCNTIONS  END============================== //

  ngOnInit() {
    // get image of claim details //
    this.getImage('SPPOLICYNO');
    // get image of Driver details //
    this.getImage('SPDLNO');
    // get image of Driver details //
    this.getImage('SPCLFRM');
    // get image of Survey Fee Bill details //
    this.getImage('SPFEEBILL');
    // get image of KYC Doc details //
    this.getImage('SPKYIDN');
    // get image of KYC Address details //
    this.getImage('SPKYADD');
    // get image Signature details //
    this.getImage('SPDSG');



    this.Loader = false;
    const completedState = localStorage.getItem('IsCompleted');
    if (completedState != undefined) {
      this.IsCompleted = JSON.parse(completedState);
    }

    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    if (userTypeId === 1) {
      this.createCaseDisabled = false;
    } else if (userTypeId === 2) {
      this.createCaseDisabled = false;
    } else if (userTypeId === 3) {
      this.createCaseDisabled = false;
    } else if (userTypeId === 4) {
      this.createCaseDisabled = true;
    }

    this.getCompanyList();
    setTimeout(() => {
      this.getVehicleDetails();
    }, 5000);
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
      this.getSummaryReportDetails();
    }, 4000);
    setTimeout(() => {
      this.getDamageDetails();
    }, 4700);

    // setTimeout(() => {
    //   this.getClaimFormStatement();
    // }, 4900);

    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required]
    });
  }

  getClaimDetails() {
    this.wizardService.getClaimDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.claimDetailData = res.Data;
        if (this.claimDetailData.length > 0) {
          this.getUserList(this.claimDetailData[0].SurveyorsId);

          this.firstFormGroup.controls['CaseID'].setValue(this.caseId);
          this.firstFormGroup.controls['CaseNo'].setValue('');
          this.firstFormGroup.controls['claimNo'].setValue(
            this.claimDetailData[0].ClaimNO
          );
          this.firstFormGroup.controls['PolicyNO'].setValue(
            this.claimDetailData[0].PolicyNO
          );
          this.firstFormGroup.controls['CompanyId'].setValue(
            this.claimDetailData[0].CompanyId
          );
          this.firstFormGroup.controls['UserID'].setValue(
            this.claimDetailData[0].UserID
          );
          this.firstFormGroup.controls['InsuredName'].setValue(
            this.claimDetailData[0].InsuredName
          );
          this.firstFormGroup.controls['InsuredAddress'].setValue(
            this.claimDetailData[0].InsuredAddress
          );
          this.firstFormGroup.controls['InsuredMobile'].setValue(
            this.claimDetailData[0].InsuredMobile
          );
          this.firstFormGroup.controls['EmailID'].setValue(
            this.claimDetailData[0].EmailID
          );
          this.firstFormGroup.controls['Policy_Start_Date'].setValue(
            this.claimDetailData[0].Policy_Start_Date
          );
          this.firstFormGroup.controls['Policy_End_Date'].setValue(
            this.claimDetailData[0].Policy_End_Date
          );
          this.firstFormGroup.controls['Policy_Type'].setValue(
            this.claimDetailData[0].Policy_Type
          );
          this.firstFormGroup.controls['Policy_Value'].setValue(
            this.claimDetailData[0].Policy_Value
          );

          this.secondFormGroup.controls['CaseID'].setValue(this.caseId);
          this.secondFormGroup.controls['SurveyorsId'].setValue(
            this.claimDetailData[0].SurveyorsId
          );
          this.secondFormGroup.controls['SurveyorsName'].setValue(
            this.claimDetailData[0].SurveyorsName
          );
          this.secondFormGroup.controls['DateofAllotmentofsurvey'].setValue(
            this.convertToDateFormat(
              this.claimDetailData[0].DateofAllotmentofsurvey
            )
          );
          this.secondFormGroup.controls['DateofSurvey'].setValue(
            this.convertToDateFormat(this.claimDetailData[0].DateofSurvey)
          );
          this.secondFormGroup.controls['SurveyLocation'].setValue(
            this.claimDetailData[0].SurveyLocation
          );
          this.secondFormGroup.controls['SurveyGeoCodes'].setValue(
            this.claimDetailData[0].SurveyGeoCodes
          );
        }
      }
    });
  }


  getPoliceReport(event) {
    // const firReport = this.sixthFormGroup.controls['FIRReported'].value;
    const firReport = event.value;
    if (firReport === 'yes') {
      this.setPolicCtrlDisabled = false;
    } else {
      this.setPolicCtrlDisabled = true;
      this.sixthFormGroup.controls['InjuryToDriver'].setValue(0);
      this.sixthFormGroup.controls['InjuryToCleaner'].setValue(false);
      this.sixthFormGroup.controls['InjuryToOtherOccupants'].setValue(false);
      this.sixthFormGroup.controls['ThirdPartyPropertyDamages'].setValue(false);
      this.sixthFormGroup.controls['FIRDate'].setValue('');
      this.sixthFormGroup.controls['FIRPoliceStation'].setValue('');
      this.sixthFormGroup.controls['FIRStationDiaryNo'].setValue('');
      this.sixthFormGroup.controls['HospitalDetails'].setValue('');
      this.sixthFormGroup.controls['Remarks'].setValue('');
    }
  }

  convertToDateFormat(Datestr) {
    if (Datestr != '') {
      // Datestr='03/08/2016'
      var datedata = Datestr.split('/');
      var formatedDateString =
        datedata[2] + '-' + datedata[1] + '-' + datedata[0] + 'T00:00:00.000Z';
      return formatedDateString;
    }
  }

  SearchRegistration() {
    const data = (document.getElementById(
      'RegistrationNum'
    ) as HTMLInputElement).value;
    this.wizardService.SearchRegistration(data).subscribe(res => {
      if (res && res.Status === '200') {
        this.VehicleSearchData = res.Data;
        this.RegSearchFailedMsg = false;
        this.RegSearchSuccessMsg = true;
        var datedata = this.VehicleSearchData[0].regn_dt;
        var formatedDatestring = this.convertToDateFormat(datedata);
        this.thirdFormGroup.controls['Registration_No'].setValue(data);
        this.thirdFormGroup.controls['RegistrationDate'].setValue(
          formatedDatestring
        );
        this.thirdFormGroup.controls['ChasisNo'].setValue(
          this.VehicleSearchData[0].chasis_no
        );
        this.thirdFormGroup.controls['EngineNo'].setValue(
          this.VehicleSearchData[0].engine_no
        );

        this.thirdFormGroup.controls['PermitNo'].setValue('');
        this.thirdFormGroup.controls['TypeofPermit'].setValue('');
        this.thirdFormGroup.controls['Make'].setValue(
          this.VehicleSearchData[0].fla_maker_desc
        );
        this.thirdFormGroup.controls['Model'].setValue(
          this.VehicleSearchData[0].fla_model_desc
        );
        this.thirdFormGroup.controls['MgfYear'].setValue(
          this.VehicleSearchData[0].manufaturer_year
        );
        this.thirdFormGroup.controls['Color'].setValue(
          this.VehicleSearchData[0].color
        );
        this.thirdFormGroup.controls['OdometerReading'].setValue('');
        this.thirdFormGroup.controls['Hypo'].setValue('');
        this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
        this.thirdFormGroup.controls['Transfer_Date'].setValue('');
        this.thirdFormGroup.controls['Class_Vehicle'].setValue(
          this.VehicleSearchData[0].fla_vh_class_desc
        );
        this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
        this.thirdFormGroup.controls['Laden_Wt'].setValue('');
        this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
        this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
        this.thirdFormGroup.controls['Permit_Area'].setValue('');
        this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
        this.thirdFormGroup.controls['FuelType'].setValue(
          this.VehicleSearchData[0].fuel_type_desc
        );
        this.thirdFormGroup.controls['Seating_Capacity'].setValue(
          this.VehicleSearchData[0].seat_cap
        );
      } else {
        this.RegSearchFailedMsg = true;
        this.RegSearchSuccessMsg = false;
        this.thirdFormGroup.controls['Registration_No'].setValue(data);
        this.thirdFormGroup.controls['VehicleName'].setValue('');
        this.thirdFormGroup.controls['RegistrationDate'].setValue('');
        this.thirdFormGroup.controls['ChasisNo'].setValue('');
        this.thirdFormGroup.controls['EngineNo'].setValue('');
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
        this.thirdFormGroup.controls['Seating_Capacity'].setValue('');
      }
    });
  }

  getVehicleDetails() {
    this.wizardService.getVehicleDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.VehicleDetailData = res.Data;
        if (this.VehicleDetailData.length > 0) {
          this.thirdFormGroup.controls['CaseVehicleId'].setValue(
            this.VehicleDetailData[0].CaseVehicleId
          );
          this.thirdFormGroup.controls['CaseID'].setValue(
            this.VehicleDetailData[0].SurveyorsId
          );
          this.thirdFormGroup.controls['VehicleId'].setValue(
            this.VehicleDetailData[0].VehicleId
          );
          this.thirdFormGroup.controls['VehicleName'].setValue(
            this.VehicleDetailData[0].VehicleName
          );
          this.thirdFormGroup.controls['Registration_No'].setValue(
            this.VehicleDetailData[0].Registration_No
          );
          const regDate = this.convertToDateFormat(this.VehicleDetailData[0].RegistrationDate);
          this.thirdFormGroup.controls['RegistrationDate'].setValue(regDate);
          this.thirdFormGroup.controls['ChasisNo'].setValue(
            this.VehicleDetailData[0].ChasisNo
          );
          this.thirdFormGroup.controls['EngineNo'].setValue(
            this.VehicleDetailData[0].EngineNo
          );
          this.thirdFormGroup.controls['FitnessCertifyValidDate'].setValue(
            this.VehicleDetailData[0].FitnessCertifyValidDate
          );
          this.thirdFormGroup.controls['PermitNo'].setValue(
            this.VehicleDetailData[0].PermitNo
          );
          this.thirdFormGroup.controls['TypeofPermit'].setValue(
            this.VehicleDetailData[0].TypeofPermit
          );
          this.thirdFormGroup.controls['Make'].setValue(
            this.VehicleDetailData[0].Make
          );
          this.thirdFormGroup.controls['Model'].setValue(
            this.VehicleDetailData[0].Model
          );
          this.thirdFormGroup.controls['MgfYear'].setValue(
            this.VehicleDetailData[0].MgfYear
          );
          this.thirdFormGroup.controls['Color'].setValue(
            this.VehicleDetailData[0].Color
          );
          this.thirdFormGroup.controls['OdometerReading'].setValue(
            this.VehicleDetailData[0].OdometerReading
          );
          this.thirdFormGroup.controls['Hypo'].setValue(
            this.VehicleDetailData[0].Hypo
          );
          this.thirdFormGroup.controls['RegisteredOwner'].setValue(
            this.VehicleDetailData[0].RegisteredOwner
          );
          this.thirdFormGroup.controls['Transfer_Date'].setValue(
            this.VehicleDetailData[0].Transfer_Date
          );
          this.thirdFormGroup.controls['Class_Vehicle'].setValue(
            this.VehicleDetailData[0].Class_Vehicle
          );
          this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue(
            this.VehicleDetailData[0].Pre_Accident_Condition
          );
          this.thirdFormGroup.controls['Laden_Wt'].setValue(
            this.VehicleDetailData[0].Laden_Wt
          );
          this.thirdFormGroup.controls['Unladen_Wt'].setValue(
            this.VehicleDetailData[0].Unladen_Wt
          );
          this.thirdFormGroup.controls['CNG_KIT_Status'].setValue(
            this.VehicleDetailData[0].CNG_KIT_Status
          );
          this.thirdFormGroup.controls['Permit_Area'].setValue(
            this.VehicleDetailData[0].Permit_Area
          );
          const roadDate = this.convertToDateFormat(this.VehicleDetailData[0].Road_Tax_ValidUpto);
          this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue(roadDate);
          this.thirdFormGroup.controls['FuelType'].setValue(
            this.VehicleDetailData[0].FuelType
          );
          this.thirdFormGroup.controls['Seating_Capacity'].setValue(
            this.VehicleDetailData[0].Seating_Capacity
          );
        }
      }
    });
  }

  getDriverDetails() {
    this.wizardService.getDriverDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.driverData = res.Data;
        if (this.driverData.length > 0) {
          if (this.driverData[0].DOB !== undefined) {
            const dateString: string = this.driverData[0].DOB.toString();
            const years: number = parseInt(dateString.substring(0, 5));
            this.driverAge = this.thisYear - years;
          }

          const issueDate = this.convertToDateFormat(this.driverData[0].IssueDate);
          const expiryDate = this.convertToDateFormat(this.driverData[0].ValidUptoDate);

          this.fourthFormGroup.controls['CaseDriverID'].setValue(
            this.driverData[0].CaseDriverID
          );
          this.fourthFormGroup.controls['CaseID'].setValue(
            this.driverData[0].CaseID
          );
          this.fourthFormGroup.controls['Drivername'].setValue(
            this.driverData[0].Drivername
          );
          this.fourthFormGroup.controls['DriverLicenseNo'].setValue(
            this.driverData[0].DriverLicenseNo
          );
          this.fourthFormGroup.controls['IssuingAuthority'].setValue(
            this.driverData[0].IssuingAuthority
          );
          this.fourthFormGroup.controls['ValidUptoDate'].setValue(expiryDate);
          this.fourthFormGroup.controls['TypeOfLicense'].setValue(
            this.driverData[0].TypeOfLicense
          );
          this.fourthFormGroup.controls['PSVBadgeNo'].setValue(
            this.driverData[0].PSVBadgeNo
          );
          this.fourthFormGroup.controls['DOB'].setValue(this.driverData[0].DOB);
          this.fourthFormGroup.controls['Age'].setValue(
            this.driverData[0].Age
          );
          this.fourthFormGroup.controls['DLEndorsment'].setValue(
            this.driverData[0].DLEndorsment
          );
          this.fourthFormGroup.controls['IssueDate'].setValue(issueDate);
        }
      }
    });
  }

  getAccidentDetails() {
    this.wizardService.geAccidentDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.accidentData = res.Data;
        if (this.accidentData.length > 0) {
          this.fifthFormGroup.controls['CaseID'].setValue(
            this.accidentData[0].CaseID
          );
          this.fifthFormGroup.controls['AccidentDate'].setValue(
            this.convertToDateFormat(this.accidentData[0].AccidentDate)
          );
          this.fifthFormGroup.controls['AccidentPlace'].setValue(
            this.accidentData[0].AccidentPlace
          );
          this.fifthFormGroup.controls['AllotementDate'].setValue(
            this.convertToDateFormat(this.accidentData[0].AllotementDate)
          );
          this.fifthFormGroup.controls['SurveyDatePlace'].setValue(
            this.accidentData[0].IssueDate
          );
          this.fifthFormGroup.controls['InsuredRepName'].setValue(
            this.accidentData[0].InsuredRepName
          );
          this.fifthFormGroup.controls['CauseofLoss'].setValue(
            this.accidentData[0].CauseofLoss
          );
          this.fifthFormGroup.controls['TPLoss'].setValue(
            this.accidentData[0].TPLoss
          );
          this.fifthFormGroup.controls['DetailsTPLoss'].setValue(
            this.accidentData[0].DetailsTPLoss
          );
        }
      }
    });
  }

  getFirDetails() {
    this.wizardService.geFirDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.firData = res.Data;
        if (this.firData.length > 0) {
          this.sixthFormGroup = new FormGroup({
            PoliceFIRID: new FormControl(this.firData[0].PoliceFIRID),
            CaseID: new FormControl(this.caseId, Validators.required),
            FIRReported: new FormControl(this.firData[0].FIRReported),
            FIRPoliceStation: new FormControl(this.firData[0].FIRPoliceStation),
            FIRStationDiaryNo: new FormControl(
              this.firData[0].FIRStationDiaryNo
            ),
            InjuryToDriver: new FormControl(this.firData[0].InjuryToDriver),
            InjuryToCleaner: new FormControl(this.firData[0].InjuryToCleaner),
            InjuryToOtherOccupants: new FormControl(
              this.firData[0].InjuryToOtherOccupants
            ),
            InjuryToThirdParty: new FormControl(
              this.firData[0].InjuryToThirdParty
            ),
            HospitalDetails: new FormControl(this.firData[0].HospitalDetails),
            ThirdPartyPropertyDamages: new FormControl(
              this.firData[0].ThirdPartyPropertyDamages
            ),
            FIRDate: new FormControl(
              this.convertToDateFormat(this.firData[0].FIRDate),
              Validators.required
            ),
            Remarks: new FormControl(this.firData[0].Remarks),
            ClaimForm: new FormControl(this.firData[0].ClaimForm)
          });
        }
      }
    });
  }

  getSummaryReportDetails() {
    this.Loader = true;
    this.wizardService.getSummaryReportDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.Loader = false;
        this.summaryReportData = res.Data;
        this.ninethFormGroup = new FormGroup({
          PNo: new FormControl(this.summaryReportData[0].PNo),
          CaseID: new FormControl(this.caseId),
          Claimform: new FormControl(this.summaryReportData[0].Claimform),
          Crashphotos: new FormControl(this.summaryReportData[0].Crashphotos),
          Drivinglisence: new FormControl(
            this.summaryReportData[0].Drivinglisence
          ),
          Rcbook: new FormControl(this.summaryReportData[0].Rcbook),
          Surveyfeesbil: new FormControl(
            this.summaryReportData[0].Surveyfeesbil
          ),
          kycdocidentity: new FormControl(
            this.summaryReportData[0].kycdocidentity
          ),
          kycdocaddress: new FormControl(
            this.summaryReportData[0].kycdocaddress
          )
        });
      } else {
        this.Loader = false;
        console.log(res.Message);
      }
    });
  }

  firstStepSubmit(formdata) {
    this.Loader = true;
    if (this.firstFormGroup.valid) {
      this.wizardService.postClaimDetails(this.firstFormGroup.value).subscribe(
        res => {
          if (res && res.Status == 200) {
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
          } else {
            this.errorMessage = res.Message;
            this.showError = true;
            this.showSuccess = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
            this.Loader = false;
          }
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this.showSuccess = false;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      );
    }
  }

  secondStepSubmit(formdata) {
    if (this.secondFormGroup.valid) {
      this.Loader = true;
      this.wizardService
        .postSurveyorDetails(this.secondFormGroup.value)
        .subscribe(
          res => {
            if (res && res.Status == 200) {
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
            } else {
              this.errorMessage = res.Message;
              this.showError = true;
              this.showSuccess = false;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
              this.Loader = false;
            }
          },
          error => {
            this.errorMessage = error;
            this.showError = true;
            this.showSuccess = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        );
    }
  }

  thirdStepSubmit(formdata) {
    if (this.thirdFormGroup.valid) {
      this.Loader = true;
      this.wizardService
        .postVehicleDetails(this.thirdFormGroup.value)
        .subscribe(
          res => {
            if (res && res.Status == 200) {
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
            } else {
              this.errorMessage = res.Message;
              this.showError = true;
              this.showSuccess = false;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
              this.Loader = false;
            }
          },
          error => {
            this.errorMessage = error;
            this.showError = true;
            this.showSuccess = false;
            this.Loader = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        );
    }
  }

  fourthSubmit(formdata) {
    debugger;
    if (this.fourthFormGroup.valid) {
      this.Loader = true;
      this.wizardService
        .postDriverDetails(this.fourthFormGroup.value)
        .subscribe(
          res => {
            if (res && res.Status == 200) {
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
            } else {
              this.errorMessage = res.Message;
              this.showError = true;
              this.showSuccess = false;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
              this.Loader = false;
            }
          },
          error => {
            this.errorMessage = error;
            this.showError = true;
            this.showSuccess = false;
            this.Loader = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        );
    }
  }

  fifthSubmit(formdata) {
    if (this.fifthFormGroup.valid) {
      this.Loader = true;
      this.wizardService
        .postAccidentDetails(this.fifthFormGroup.value)
        .subscribe(
          res => {
            if (res && res.Status == 200) {
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
            } else {
              this.errorMessage = res.Message;
              this.showError = true;
              this.showSuccess = false;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
              this.Loader = false;
            }
          },
          error => {
            this.errorMessage = error;
            this.showError = true;
            this.showSuccess = false;
            this.Loader = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        );
    }
  }

  sixthSubmit(formdata) {
    if (this.sixthFormGroup.valid) {
      this.Loader = true;
      this.wizardService.postFirDetails(this.sixthFormGroup.value).subscribe(
        res => {
          if (res && res.Status == 200) {
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
          } else {
            this.errorMessage = res.Message;
            this.showError = true;
            this.showSuccess = false;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
            this.Loader = false;
          }
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this.showSuccess = false;
          this.Loader = false;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      );
    }
  }

  getDamageDetails() {
    this.Loader = true;
    this.wizardService.GetDamageDetails().subscribe(res => {
      if (res && res.Status == 200) {
        this.damageDetailsData = res.Data;
        this.Loader = false;
      }
    });
  }

  getDamagePartList() {
    this.Loader = true;
    this.uploadImageModal = true;
    this.wizardService.GetDamagePartList().subscribe(res => {
      if (res && res.Status == 200) {
        this.damagePartList = res.Data;
        this.Loader = false;
      }
    });
  }

  closeImageModal() {
    this.uploadImageModal = false;
  }

  showdamageListData(data) {
    this.PartStatusID = localStorage.getItem('PartStatusID');
    this.eightthFormGroup = new FormGroup({
      CaseID: new FormControl(this.caseId),
      PartType: new FormControl(data.PartType),
      PartID: new FormControl(data.PartID),
      PartName: new FormControl(data.PartName),
      PartStatus: new FormControl(this.PartStatusID),
      PartStatusID: new FormControl(this.PartStatusID),
      PartRemark: new FormControl(data.PartRemark)
    });
  }

  getPartStatusID(event) {
    localStorage.setItem('PartStatusID', event.value);
    this.PartStatusID = localStorage.getItem('PartStatusID');
    this.eightthFormGroup.controls['PartStatusID'].setValue(this.PartStatusID);
  }

  eightthStepSubmit(formdata) {
    if (this.eightthFormGroup.valid) {
      this.Loader = true;
      this.wizardService
        .PostDamageDetails(this.eightthFormGroup.value)
        .subscribe(
          res => {
            if (res && res.Status == 200) {
              this.uploadImageModal = false;
              this.postResponseData = res.Data;
              this.successMessage = res.Message;
              alert('You have updated part ' + this.successMessage + 'lly');
              this.showError = false;
              this.showSuccess = true;
              setTimeout(() => {
                this.showSuccess = false;
                // this.stepper.next();
              }, 3000);
            } else {
              this.errorMessage = res.Message;
              this.showError = true;
              this.showSuccess = false;
              alert(this.errorMessage);
              alert('You have failed to updated part, ' + this.errorMessage);
              setTimeout(() => {
                this.showError = false;
              }, 3000);
            }
            this.Loader = false;
            this.getDamageDetails();
          },
          error => {
            this.errorMessage = error;
            this.showError = true;
            this.showSuccess = false;
            alert('You have failed to updated part, ' + this.errorMessage);
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        );
    }
  }
}
