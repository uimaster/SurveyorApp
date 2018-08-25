import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { PreWizardService } from './wizard.service';
import { WizardService } from '../wizard/wizard.service';
import * as IMAGEURL from '../../shared/img.urls';
import { DonwloadDialog } from '../sharedModule/shared.component';
import { CompaniesService } from '../companies/companies.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { SharedModuleServices } from '../sharedModule/shared.service';
import { GenericGetImageResponseModel } from '../sharedModule/shared.model';
import { CommonImageComponent } from '../sharedModule/images.component';

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
    successMessage: string;
    maxDateToday = new Date();
    errorMessage: string;
    showError = false;
    showSuccess = false;
    caseId: any;
    caseNO: any;
    showPartsList = false;
    public files: any[];
    Loader = true;
    VehicleTypeID = [
        { VehicleTypeID: 2, Name: 'LCV/HCV' },
        { VehicleTypeID: 1, Name: 'HTV/BUS' },
        { VehicleTypeID: 3, Name: 'TWO-Wheeler' },
        { VehicleTypeID: 4, Name: 'PERSONAL' },
        { VehicleTypeID: 5, Name: 'TAXI' }
    ];

    FuelType = [
        {FuelType: 'PETROL/CNG'},
        {FuelType: 'PETROL/ELECTRIC/HYBRID'},
        {FuelType: 'DIESEL'},
        {FuelType: 'ELECTRIC'},
        {FuelType: 'PETROL/HYBRID'},
        {FuelType: 'PETROL'},
        {FuelType: 'CNG'},
        {FuelType: 'PETROL/LPG'}
      ];
    PartStatusID: any;
    companyListData = [];
    selectedCompany: any;
    submitDisabled = false;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    allExpandState: boolean;
    RegSearchSuccessMsg = false;
    RegSearchFailedMsg = false;
    policyEndMaxDate: any;
    uploadImageModal = false;
    IsCompleted: boolean;
    userList = [];
    StatusData = [];
    showStatusList = false;
    openCreateCaseModal = false;
    createCaseDisabled = false;
    showSignBroseBtn = true;
    VehicleSearchData = [];
    signatureImgUrl: string;
    customSignUrl: string;
    imageData: any;
    imageBaseUrl = 'http://apiflacorev2.iflotech.in';
    surveyorId = JSON.parse(localStorage.getItem('SurveyorsId'));

    constructor(private _formBuilder: FormBuilder, private wizardService: PreWizardService, private spotService: WizardService,
        private httpClient: HttpClient, public dialog: MatDialog, private router: Router, private companyService: CompaniesService,
        private dashboardService: DashboardService, private sharedService: SharedModuleServices, private imageService: CommonImageComponent,
    ) {
        this.caseId = localStorage.getItem('CaseID');
        this.caseNO = localStorage.getItem('CaseNO');

        this.firstFormGroup = new FormGroup({
            CaseID: new FormControl(this.caseId),
            CaseNo: new FormControl(''),
            CaseDate: new FormControl(''),
            CaseRefNo: new FormControl(''),
            CaseProposerName: new FormControl(''),
            CompanyID: new FormControl(''),
            UserID: new FormControl('', Validators.required),
            CompanyName: new FormControl(''),
            CaseTypeId: new FormControl(''),
            SurveyorsID: new FormControl(''),
            AssignedDateTime: new FormControl('', Validators.required),
            caseAddress: new FormControl(''),
            InspectionDate: new FormControl('', Validators.required),
            InspectionTime: new FormControl('', Validators.required),
            InspectionLocation: new FormControl(''),
            InspectionGeoCodes: new FormControl({value: '', disabled: true}),
            SurveyStatusID: new FormControl(''),
        });



        this.thirdFormGroup = new FormGroup({
            CaseID: new FormControl(JSON.parse(this.caseId)),
            VehicleTypeID: new FormControl(this.surveyorId),
            VehicleTypeName: new FormControl(''),
            Registration_No: new FormControl(''),
            ChasisNo: new FormControl(''),
            EngineNo: new FormControl(''),
            Make: new FormControl(''),
            Model: new FormControl(''),
            Variant: new FormControl(''),
            MgfYear: new FormControl(''),
            Color: new FormControl(''),
            FitnessCertifyValidDate: new FormControl('1900-01-01'),
            RegistrationDate: new FormControl('', Validators.required),
            FuelType: new FormControl(''),
            HypoticatedTo: new FormControl(''),
            OdometerReading: new FormControl(''),
            RegisteredOwner: new FormControl(''),
            Transfer_Date: new FormControl(''),
            Class_Vehicle: new FormControl(''),
            Pre_Accident_Condition: new FormControl(''),
            Laden_Wt: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
            Unladen_Wt: new FormControl('',  Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
            CNG_KIT_Status: new FormControl(''),
            Permit_Area: new FormControl(''),
            Road_Tax_ValidUpto: new FormControl(''),
            Seating_Capacity: new FormControl('')
        });

        this.ninethFormGroup = new FormGroup({
            CaseID: new FormControl(this.caseId),
            CaseProposerName: new FormControl(''),
            CurrentInsurerName: new FormControl(''),
            CurrentPolicyNo: new FormControl(''),
            PolicyStartDate: new FormControl(''),
            PolicyEndDate: new FormControl(''),
            ClaimHistory: new FormControl('', Validators.required),
            GapInInsurance: new FormControl('', Validators.required),
            ProposedInsured: new FormControl('', Validators.required),
            CaseRemarks: new FormControl(''),
            PolicyType: new FormControl(''),
            PolicyValue: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/))
        });

        this.eightthFormGroup = new FormGroup({
            CaseID: new FormControl(this.caseId),
            PartType: new FormControl(''),
            PartID: new FormControl(''),
            PartName: new FormControl(''),
            PartStatus: new FormControl(''),
            PartStatusID: new FormControl(2),
            PartRemark: new FormControl('')
        });

        this.tenthFormGroup = new FormGroup({

            CaseID: new FormControl(this.caseId),
            InsuranceRecommeded: new FormControl('', Validators.required),
            ConclusionRemarks: new FormControl('', Validators.required)
        });
    }

    getUserList(data) {
      this.dashboardService.getUserList(data)
          .subscribe(res => {
          this.userList = res.Data;
          // this.firstFormGroup.controls['UserID'].setValue(this.userList[0].UserID);
      });
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
    }, 2000);
  }

  getImage(typeCode) {
    this.Loader = true;
    const ClaimGetPayload = { CaseID: this.caseId, CaseImageCode: typeCode };
    this.sharedService.getImages(ClaimGetPayload).subscribe(
      (res: GenericGetImageResponseModel) => {
        this.imageData = res.Data[0];
        if (res && this.imageData != null) {
          switch (typeCode) {
            case 'SPDSG':
              this.signatureImgUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            case 'PICUST':
              this.customSignUrl = this.imageBaseUrl + this.imageData.Image;
              break;
            default:
              console.log('No image items are available');
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
      this.getImage('SPDSG');
      this.getImage('PICUST');

     // this.showSignBroseBtn = JSON.parse(localStorage.getItem('showSignBroseBtn'));
        this.Loader = false;
        const completedState = localStorage.getItem('IsCompleted');
        if( completedState != undefined) {
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

        setTimeout(() => {
            this.getCaseDetails();
        }, 200);
        this.getCompanyList();
        setTimeout(() => {
            this.getVehicleDetails();
        }, 2500);
        setTimeout(() => {
            this.getInsuranceDetails();
        }, 700);
        setTimeout(() => {
            this.getConclusion();
        }, 900);
        setTimeout(() => {
            this.getDamageDetails();
        }, 2000);
        setTimeout(() => {
            this.getDamagePartList();
        }, 4000);


        this.seventhFormGroup = this._formBuilder.group({

        });

        // this.tenthFormGroup = this._formBuilder.group({
        //     tenthCtrl: ['', Validators.required]
        // });




    }

    specialCharPrevention(event) {
      const key = event.keyCode;
      const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
        key === 55 || key === 48  || key === 57  || key === 186 ));
      if (preventsKey) {
        console.log('Special characters not allowed');
        return false;
      }
    }

    convertToDateFormat(Datestr) {
      if ( Datestr!="" ) { // Datestr="03/08/2016"
          var datedata = Datestr.split("/");
          var formatedDateString=datedata[2]+'-' + datedata[1] + '-' + datedata[0] + 'T00:00:00.000Z';
          return formatedDateString;
      }
    }

    SearchRegistration() {

        let data = ((document.getElementById("RegistrationNum") as HTMLInputElement).value);
        this.wizardService.SearchRegistration(data)
            .subscribe(res => {
                if (res && res.Status === '200') {
                    this.VehicleSearchData = res.Data;
                    this.RegSearchFailedMsg = false;
                    this.RegSearchSuccessMsg = true;

                    const datedata = this.VehicleSearchData[0].regn_dt;
                    const formatedDatestring = this.convertToDateFormat(datedata);

                    this.thirdFormGroup.controls['VehicleTypeName'].setValue('');
                    this.thirdFormGroup.controls['Registration_No'].setValue(data);
                    this.thirdFormGroup.controls['ChasisNo'].setValue(this.VehicleSearchData[0].chasis_no);
                    this.thirdFormGroup.controls['EngineNo'].setValue(this.VehicleSearchData[0].engine_no);
                    this.thirdFormGroup.controls['Make'].setValue(this.VehicleSearchData[0].fla_maker_desc);
                    this.thirdFormGroup.controls['Model'].setValue(this.VehicleSearchData[0].fla_model_desc);
                    this.thirdFormGroup.controls['Variant'].setValue('');
                    this.thirdFormGroup.controls['MgfYear'].setValue(this.VehicleSearchData[0].manufaturer_year);
                    this.thirdFormGroup.controls['Color'].setValue(this.VehicleSearchData[0].color);
                    this.thirdFormGroup.controls['RegistrationDate'].setValue(formatedDatestring);
                    this.thirdFormGroup.controls['FuelType'].setValue(this.VehicleSearchData[0].fuel_type_desc);
                    this.thirdFormGroup.controls['HypoticatedTo'].setValue('');
                    this.thirdFormGroup.controls['OdometerReading'].setValue('');
                    this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
                    this.thirdFormGroup.controls['Transfer_Date'].setValue('');
                    this.thirdFormGroup.controls['Class_Vehicle'].setValue(this.VehicleSearchData[0].fla_vh_class_desc);
                    this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
                    this.thirdFormGroup.controls['Laden_Wt'].setValue('');
                    this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
                    this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
                    this.thirdFormGroup.controls['Permit_Area'].setValue('');
                    this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
                    this.thirdFormGroup.controls['Seating_Capacity'].setValue(this.VehicleSearchData[0].seat_cap);
                } else {
                    this.RegSearchFailedMsg = true;
                    this.RegSearchSuccessMsg = false;
                    this.thirdFormGroup.controls['VehicleTypeID'].setValue(this.surveyorId);
                    this.thirdFormGroup.controls['VehicleTypeName'].setValue('');
                    this.thirdFormGroup.controls['Registration_No'].setValue(data);
                    this.thirdFormGroup.controls['ChasisNo'].setValue('');
                    this.thirdFormGroup.controls['EngineNo'].setValue('');
                    this.thirdFormGroup.controls['Make'].setValue('');
                    this.thirdFormGroup.controls['Model'].setValue('');
                    this.thirdFormGroup.controls['Variant'].setValue('');
                    this.thirdFormGroup.controls['MgfYear'].setValue('');
                    this.thirdFormGroup.controls['Color'].setValue('');
                    this.thirdFormGroup.controls['RegistrationDate'].setValue('');
                    this.thirdFormGroup.controls['FuelType'].setValue('');
                    this.thirdFormGroup.controls['HypoticatedTo'].setValue('');
                    this.thirdFormGroup.controls['OdometerReading'].setValue('');
                    this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
                    this.thirdFormGroup.controls['Transfer_Date'].setValue('');
                    this.thirdFormGroup.controls['Class_Vehicle'].setValue('');
                    this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
                    this.thirdFormGroup.controls['Laden_Wt'].setValue('');
                    this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
                    this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
                    this.thirdFormGroup.controls['Permit_Area'].setValue('');
                    this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
                    this.thirdFormGroup.controls['Seating_Capacity'].setValue('');
                }
            });
    }


    openDialog() {
        const dialogRef = this.dialog.open(DonwloadDialog, {
            height: '300px',
            disableClose: true,
            width: "350px"
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }


    getSpotStepsStatus() {
      let CaseID = this.caseId;
      this.wizardService.getPIStepsStatus(CaseID).subscribe(res => {
        if (res && res.Data !== null) {
          this.StatusData = res.Data;
          console.log(this.StatusData);
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
        this.companyService.getCompanyList()
            .subscribe(res => {
                this.companyListData = res.Data;
            });
    }

    // getPolicyStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    //     var SelectedDate:any = event.value;
    //     var dd:any = SelectedDate.getDate();
    //     var mm:any = SelectedDate.getMonth()+1; //January is 0!
    //     var yyyy:any = SelectedDate.getFullYear()-1;
    //     if(dd<10){
    //             dd='0'+dd
    //         }
    //         if(mm<10){
    //             mm='0'+mm
    //         }

    //     let backYear = yyyy+'-'+mm+'-'+dd;

    //     this.policyEndMaxDate = backYear;
    //     this.ninethFormGroup.controls['PolicyEndDate'].setValue('');
    // }

    getPolicyStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
      const SelectedDate = event.value;
      const dateString = new Date(SelectedDate);
      const finalDate = new Date(dateString.getFullYear() - 1, dateString.getMonth(), dateString.getDate());
      this.policyEndMaxDate = finalDate;
      this.firstFormGroup.controls['PolicyEndDate'].setValue('');
    }

    getCaseDetails() {
        this.wizardService.pre_GetCaseDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.caseDetailData = res.Data;
                    this.selectedCompany = this.caseDetailData[0].CompanyID;
                    if (this.caseDetailData.length > 0) {
                      this.getUserList(this.caseDetailData[0].SurveyorsID);
                        // let AssDateTime = (new Date(this.caseDetailData[0].AssignedDateTime)).toISOString();
                        // let inspectDate = (new Date(this.caseDetailData[0].InspectionDate)).toISOString();
                        // let InspectTime = (new Date(this.caseDetailData[0].InspectionTime)).toLocaleString();
                        this.firstFormGroup.controls['CaseID'].setValue(this.caseId);
                        this.firstFormGroup.controls['CaseNo'].setValue(this.caseDetailData[0].CaseNo);
                        this.firstFormGroup.controls['CaseDate'].setValue(this.convertToDateFormat(this.caseDetailData[0].CaseDate));
                        this.firstFormGroup.controls['CaseRefNo'].setValue(this.caseDetailData[0].CaseRefNo);
                        this.firstFormGroup.controls['CaseProposerName'].setValue(this.caseDetailData[0].CaseProposerName);
                        this.firstFormGroup.controls['CompanyID'].setValue(this.caseDetailData[0].CompanyID);
                        this.firstFormGroup.controls['UserID'].setValue(this.caseDetailData[0].UserID);
                        this.firstFormGroup.controls['CompanyName'].setValue(this.caseDetailData[0].CompanyName);
                        this.firstFormGroup.controls['CaseTypeId'].setValue(this.caseDetailData[0].CaseTypeId);
                        this.firstFormGroup.controls['SurveyorsID'].setValue(this.caseDetailData[0].SurveyorsID);

                        this.firstFormGroup.controls['AssignedDateTime'].setValue(
                          this.convertToDateFormat(this.caseDetailData[0].AssignedDateTime));
                        this.firstFormGroup.controls['caseAddress'].setValue(this.caseDetailData[0].caseAddress);
                        this.firstFormGroup.controls['InspectionDate'].setValue(
                          this.convertToDateFormat(this.caseDetailData[0].InspectionDate));
                        this.firstFormGroup.controls['InspectionLocation'].setValue(this.caseDetailData[0].InspectionLocation);
                        this.firstFormGroup.controls['InspectionTime'].setValue(
                          this.caseDetailData[0].InspectionTime);
                        this.firstFormGroup.controls['InspectionGeoCodes'].setValue(this.caseDetailData[0].InspectionGeoCodes);
                        this.firstFormGroup.controls['SurveyStatusID'].setValue(this.caseDetailData[0].SurveyStatusID);
                    }
                }
            });
    }

    getVehicleDetails() {
        this.wizardService.pre_GetVehicleDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.VehicleDetailData = res.Data;
                    if (this.VehicleDetailData && this.VehicleDetailData.length > 0 ) {
                      this.thirdFormGroup.controls['CaseID'].setValue(JSON.parse(this.caseId)),
                      this.thirdFormGroup.controls['VehicleTypeID'].setValue(this.VehicleDetailData[0].VehicleTypeID);
                      this.thirdFormGroup.controls['VehicleTypeName'].setValue(this.VehicleDetailData[0].VehicleTypeName);
                      this.thirdFormGroup.controls['Registration_No'].setValue(this.VehicleDetailData[0].Registration_No);
                      this.thirdFormGroup.controls['RegistrationDate'].setValue(this.convertToDateFormat(
                          this.VehicleDetailData[0].RegistrationDate));
                      this.thirdFormGroup.controls['ChasisNo'].setValue(this.VehicleDetailData[0].ChasisNo);
                      this.thirdFormGroup.controls['EngineNo'].setValue(this.VehicleDetailData[0].EngineNo);
                      this.thirdFormGroup.controls['FitnessCertifyValidDate'].setValue(this.VehicleDetailData[0].FitnessCertifyValidDate);
                      this.thirdFormGroup.controls['Make'].setValue(this.VehicleDetailData[0].Make);
                      this.thirdFormGroup.controls['Model'].setValue(this.VehicleDetailData[0].Model);
                      this.thirdFormGroup.controls['Variant'].setValue(this.VehicleDetailData[0].Variant);
                      this.thirdFormGroup.controls['MgfYear'].setValue(this.VehicleDetailData[0].MgfYear);
                      this.thirdFormGroup.controls['Color'].setValue(this.VehicleDetailData[0].Color);
                      this.thirdFormGroup.controls['OdometerReading'].setValue(this.VehicleDetailData[0].OdometerReading);
                      this.thirdFormGroup.controls['HypoticatedTo'].setValue(this.VehicleDetailData[0].HypoticatedTo);
                      this.thirdFormGroup.controls['RegisteredOwner'].setValue(this.VehicleDetailData[0].RegisteredOwner);
                      this.thirdFormGroup.controls['Transfer_Date'].setValue(this.VehicleDetailData[0].Transfer_Date);
                      this.thirdFormGroup.controls['Class_Vehicle'].setValue(this.VehicleDetailData[0].Class_Vehicle);
                      this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue(this.VehicleDetailData[0].Pre_Accident_Condition);
                      this.thirdFormGroup.controls['Laden_Wt'].setValue(this.VehicleDetailData[0].Laden_Wt);
                      this.thirdFormGroup.controls['Unladen_Wt'].setValue(this.VehicleDetailData[0].Unladen_Wt);
                      this.thirdFormGroup.controls['CNG_KIT_Status'].setValue(this.VehicleDetailData[0].CNG_KIT_Status);
                      this.thirdFormGroup.controls['Permit_Area'].setValue(this.VehicleDetailData[0].Permit_Area);
                      this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue(this.convertToDateFormat(
                          this.VehicleDetailData[0].Road_Tax_ValidUpto));
                      this.thirdFormGroup.controls['FuelType'].setValue(this.VehicleDetailData[0].FuelType);
                      this.thirdFormGroup.controls['Seating_Capacity'].setValue(this.VehicleDetailData[0].Seating_Capacity);
                      this.thirdFormGroup.controls['Variant'].setValue(this.VehicleDetailData[0].Variant);
                      this.thirdFormGroup.controls['HypoticatedTo'].setValue(this.VehicleDetailData[0].HypoticatedTo);
                    }
                }
            });
    }

    getInsuranceDetails() {
        this.wizardService.pre_GetInsuranceDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.insuranceDetailsData = res.Data;
                    if (this.insuranceDetailsData.length > 0) {
                      this.ninethFormGroup.controls['CaseID'].setValue(this.insuranceDetailsData[0].CaseID);
                      this.ninethFormGroup.controls['CaseProposerName'].setValue(this.insuranceDetailsData[0].CaseProposerName);
                      this.ninethFormGroup.controls['CurrentInsurerName'].setValue(this.insuranceDetailsData[0].CurrentInsurerName);
                      this.ninethFormGroup.controls['CurrentPolicyNo'].setValue(this.insuranceDetailsData[0].CurrentPolicyNo);
                      this.ninethFormGroup.controls['PolicyStartDate'].setValue(this.convertToDateFormat(
                        this.insuranceDetailsData[0].PolicyStartDate));
                      this.ninethFormGroup.controls['PolicyEndDate'].setValue(this.convertToDateFormat(
                        this.insuranceDetailsData[0].PolicyEndDate));
                      this.ninethFormGroup.controls['ClaimHistory'].setValue(this.insuranceDetailsData[0].ClaimHistory);
                      this.ninethFormGroup.controls['GapInInsurance'].setValue(this.insuranceDetailsData[0].GapInInsurance);
                      this.ninethFormGroup.controls['ProposedInsured'].setValue(this.insuranceDetailsData[0].ProposedInsured);
                      this.ninethFormGroup.controls['CaseRemarks'].setValue(this.insuranceDetailsData[0].CaseRemarks);
                      this.ninethFormGroup.controls['PolicyType'].setValue(this.insuranceDetailsData[0].PolicyType);
                      this.ninethFormGroup.controls['PolicyValue'].setValue(this.insuranceDetailsData[0].PolicyValue);
                    }
                }
            })
    }

    getConclusion() {
        this.wizardService.pre_GetConclusion()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.conclusionData = res.Data;
                    if (this.conclusionData.length > 0) {
                        this.tenthFormGroup = new FormGroup({
                            CaseID: new FormControl(this.caseId),
                            InsuranceRecommeded: new FormControl(this.conclusionData[0].InsuranceRecommeded, Validators.required),
                            ConclusionRemarks: new FormControl(this.conclusionData[0].ConclusionRemarks, Validators.required)
                        })
                    }
                    else {
                        this.tenthFormGroup = new FormGroup({
                            CaseID: new FormControl(this.caseId),
                            InsuranceRecommeded: new FormControl('', Validators.required),
                            ConclusionRemarks: new FormControl('', Validators.required)
                        })
                    }
                }
            })
    }

    getDamageDetails() {
        this.Loader = true;
        this.wizardService.pre_GetDamageDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.damageDetailsData = res.Data;
                    this.Loader = false;
                }
            })
    }

    closeImageModal(){
        this.uploadImageModal = false;
    }

    getDamagePartList() {
        this.Loader = true;
        this.uploadImageModal = true;
        this.wizardService.pre_GetDamagePartList()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.damagePartList = res.Data;
                    this.Loader = false;
                }
            })
    }

    showdamageListData(data) {
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

    getPartStatusID(event) {
        localStorage.setItem('PartStatusID', event.value);
        this.PartStatusID = localStorage.getItem('PartStatusID')
        this.eightthFormGroup.controls['PartStatusID'].setValue(this.PartStatusID);
    }

    firstStepSubmit(formdata) {
        if (this.firstFormGroup.valid) {
            this.Loader = true;
            this.wizardService.pre_PostCaseDetails(this.firstFormGroup.value).subscribe(res => {
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

                }
                else {
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error => {
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            })
        }
    }

    thirdStepSubmit(formdata) {
        if (this.thirdFormGroup.valid) {
            this.Loader = true;
            this.wizardService.pre_PostVehicleDetails(this.thirdFormGroup.value).subscribe(res => {
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
                }
                else {
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error => {
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            })
        }
    }

    ninthStepSubmit(formdata) {
        if (this.ninethFormGroup.valid) {
            this.Loader = true;
            this.wizardService.pre_PostInsuranceDetails(this.ninethFormGroup.value).subscribe(res => {
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
                }
                else {
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error => {
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            });
        }
    }

    tenthStepSubmit(formdata) {
        if (this.tenthFormGroup.valid) {
            this.Loader = true;
            this.wizardService.pre_PostConclusion(this.tenthFormGroup.value).subscribe(res => {
                if (res && res.Status == 200) {
                    this.postResponseData = res.Data;
                    this.successMessage = res.Message;
                    this.showError = false;
                    this.showSuccess = true;
                    this.submitDisabled = true;
                    setTimeout(() => {
                        this.router.navigate['/dashboard'];
                        this.submitDisabled = false;
                    }, 3000);
                } else {
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
            }, error => {
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            });
        }
        this.getSpotStepsStatus();
    }


    eightthStepSubmit(formdata) {
        if (this.eightthFormGroup.valid) {
            this.Loader = true;
            this.wizardService.pre_PostDamageDetails(this.eightthFormGroup.value).subscribe(res => {
                if (res && res.Status == 200) {
                    this.postResponseData = res.Data;
                    this.successMessage = res.Message;
                    alert("You have updated part " + this.successMessage + 'lly');
                    this.showError = false;
                    this.showSuccess = true;
                    setTimeout(() => {
                        this.showSuccess = false;
                        // this.stepper.next();
                    }, 3000);
                    this.allExpandState = false;
                }
                else {
                    this.errorMessage = res.Message;
                    this.showError = true;
                    this.showSuccess = false;
                    alert("You have failed to updated part, " + this.errorMessage);
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                }
                this.Loader = false;
                this.getDamageDetails();
            }, error => {
                this.errorMessage = error;
                this.showError = true;
                this.showSuccess = false;
                alert("You have failed to updated part, " + this.errorMessage);
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            })
        }
    }
}
