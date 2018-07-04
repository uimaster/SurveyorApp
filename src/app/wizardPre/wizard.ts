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
    errorMessage: string;
    showError = false;
    showSuccess = false;
    caseId: any = localStorage.getItem('CaseID');
    caseNO: any = localStorage.getItem('CaseNO');
    showPartsList = false;
    public files: any[];
    Loader = true;
    VehicleTypeID = [
        { VehicleTypeID: 0, Name: 'LCV/HCV' },
        { VehicleTypeID: 1, Name: 'HTV/BUS' },
        { VehicleTypeID: 2, Name: 'TWO-Wheeler' },
        { VehicleTypeID: 3, Name: 'CAR' },
        { VehicleTypeID: 4, Name: 'TAXI' }
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

    constructor(private _formBuilder: FormBuilder, private wizardService: PreWizardService, private spotService: WizardService,
        private httpClient: HttpClient, public dialog: MatDialog, private router: Router, private companyService: CompaniesService
    ) {

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
            AssignedDateTime: new FormControl('', Validators.required),
            caseAddress: new FormControl(''),
            InspectionDate: new FormControl('', Validators.required),
            InspectionTime: new FormControl('', Validators.required),
            InspectionLocation: new FormControl(''),
            InspectionGeoCodes: new FormControl(''),
            SurveyStatusID: new FormControl(''),
        });

        this.thirdFormGroup = new FormGroup({
            CaseID: new FormControl(this.caseId),
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
            FitnessCertifyValidDate: new FormControl('1900-01-01'),
            RegistrationDate: new FormControl('', Validators.required),
            FuelType: new FormControl(''),
            HypoticatedTo: new FormControl(''),
            OdometerReading: new FormControl(''),
            RegisteredOwner: new FormControl(''),
            Transfer_Date: new FormControl(''),
            Class_Vehicle: new FormControl(''),
            Pre_Accident_Condition: new FormControl(''),
            Laden_Wt: new FormControl(''),
            Unladen_Wt: new FormControl(''),
            CNG_KIT_Status: new FormControl(''),
            Permit_Area: new FormControl(''),
            Road_Tax_ValidUpto: new FormControl('')
        });

        this.ninethFormGroup = new FormGroup({
            CaseID: new FormControl(''),
            CaseProposerName: new FormControl(''),
            CurrentInsurerName: new FormControl(''),
            CurrentPolicyNo: new FormControl(''),
            PolicyStartDate: new FormControl(''),
            PolicyEndDate: new FormControl(''),
            ClaimHistory: new FormControl('', Validators.required),
            GapInInsurance: new FormControl('', Validators.required),
            ProposedInsured: new FormControl('', Validators.required),
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
        this.Loader = false;
        let completedState = localStorage.getItem('IsCompleted');
        if(completedState != undefined){
            this.IsCompleted = JSON.parse(completedState);
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

    SearchRegistration() {

        let data = ((document.getElementById("RegistrationNum") as HTMLInputElement).value);
        this.wizardService.SearchRegistration(data)
            .subscribe(res => {
                if (res && res.GetVehicleDataResult.status === '200') {
                    this.VehicleDetailData = res.GetVehicleDataResult.vehicle;
                    this.RegSearchFailedMsg = false;
                    this.RegSearchSuccessMsg = true;
                    this.thirdFormGroup.controls['VehicleTypeID'].setValue('');
                    this.thirdFormGroup.controls['VehicleTypeName'].setValue('');
                    this.thirdFormGroup.controls['Registration_No'].setValue(data);
                    this.thirdFormGroup.controls['ChasisNo'].setValue(res.GetVehicleDataResult.vehicle.chasis_no);
                    this.thirdFormGroup.controls['EngineNo'].setValue(res.GetVehicleDataResult.vehicle.engine_no);
                    this.thirdFormGroup.controls['Make'].setValue(res.GetVehicleDataResult.vehicle.fla_maker_desc);
                    this.thirdFormGroup.controls['Model'].setValue(res.GetVehicleDataResult.vehicle.fla_model_desc);
                    this.thirdFormGroup.controls['Variant'].setValue('');
                    this.thirdFormGroup.controls['MgfYear'].setValue(res.GetVehicleDataResult.vehicle.manufaturer_year);
                    this.thirdFormGroup.controls['Color'].setValue(res.GetVehicleDataResult.vehicle.color);
                    this.thirdFormGroup.controls['RegistrationDate'].setValue(res.GetVehicleDataResult.vehicle.regn_dt);
                    this.thirdFormGroup.controls['FuelType'].setValue(res.GetVehicleDataResult.vehicle.fuel_type_desc);
                    this.thirdFormGroup.controls['HypoticatedTo'].setValue('');
                    this.thirdFormGroup.controls['OdometerReading'].setValue('');
                    this.thirdFormGroup.controls['RegisteredOwner'].setValue('');
                    this.thirdFormGroup.controls['Transfer_Date'].setValue('');
                    this.thirdFormGroup.controls['Class_Vehicle'].setValue(res.GetVehicleDataResult.vehicle.fla_vh_class_desc);
                    this.thirdFormGroup.controls['Pre_Accident_Condition'].setValue('');
                    this.thirdFormGroup.controls['Laden_Wt'].setValue('');
                    this.thirdFormGroup.controls['Unladen_Wt'].setValue('');
                    this.thirdFormGroup.controls['CNG_KIT_Status'].setValue('');
                    this.thirdFormGroup.controls['Permit_Area'].setValue('');
                    this.thirdFormGroup.controls['Road_Tax_ValidUpto'].setValue('');
                } else {
                    this.RegSearchFailedMsg = true;
                    this.RegSearchSuccessMsg = false;
                    this.thirdFormGroup.controls['VehicleTypeID'].setValue('');
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
                }
            })
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

    getCompanyList() {
        this.companyService.getCompanyList()
            .subscribe(res => {
                this.companyListData = res.Data;
            });
    }

    getPolicyStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
        var SelectedDate:any = event.value;
        var dd:any = SelectedDate.getDate();
        var mm:any = SelectedDate.getMonth()+1; //January is 0!
        var yyyy:any = SelectedDate.getFullYear()-1;
        if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }

        let backYear = yyyy+'-'+mm+'-'+dd;

        this.policyEndMaxDate = backYear;
        this.ninethFormGroup.controls['PolicyEndDate'].setValue('');
    }

    getCaseDetails() {
        this.wizardService.pre_GetCaseDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.caseDetailData = res.Data;
                    this.selectedCompany = this.caseDetailData[0].CompanyID;
                    if (this.caseDetailData.length > 0) {
                        let AssDateTime = (new Date(this.caseDetailData[0].AssignedDateTime)).toISOString();
                        let inspectDate = (new Date(this.caseDetailData[0].InspectionDate)).toISOString();
                        let InspectTime = (new Date(this.caseDetailData[0].InspectionTime)).toISOString();
                        this.firstFormGroup.controls['CaseID'].setValue(this.caseId);
                        this.firstFormGroup.controls['CaseNo'].setValue(this.caseDetailData[0].CaseNo);
                        this.firstFormGroup.controls['CaseDate'].setValue(this.caseDetailData[0].CaseDate);
                        this.firstFormGroup.controls['CaseRefNo'].setValue(this.caseDetailData[0].CaseRefNo);
                        this.firstFormGroup.controls['CaseProposerName'].setValue(this.caseDetailData[0].CaseProposerName);
                        this.firstFormGroup.controls['CompanyID'].setValue(this.caseDetailData[0].CompanyID);
                        this.firstFormGroup.controls['CompanyName'].setValue(this.caseDetailData[0].CompanyName);
                        this.firstFormGroup.controls['CaseTypeId'].setValue(this.caseDetailData[0].CaseTypeId);
                        this.firstFormGroup.controls['SurveyorsID'].setValue(this.caseDetailData[0].SurveyorsID);
                        this.firstFormGroup.controls['AssignedDateTime'].setValue(AssDateTime);
                        this.firstFormGroup.controls['caseAddress'].setValue(this.caseDetailData[0].caseAddress);
                        this.firstFormGroup.controls['InspectionDate'].setValue(inspectDate);
                        this.firstFormGroup.controls['InspectionLocation'].setValue(this.caseDetailData[0].InspectionLocation);
                        this.firstFormGroup.controls['InspectionTime'].setValue(InspectTime);
                        this.firstFormGroup.controls['InspectionGeoCodes'].setValue(this.caseDetailData[0].InspectionGeoCodes);
                        this.firstFormGroup.controls['SurveyStatusID'].setValue(this.caseDetailData[0].SurveyStatusID);
                    }
                }
            })
    }

    getVehicleDetails() {
        this.wizardService.pre_GetVehicleDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.VehicleDetailData = res.Data;
                    if (this.VehicleDetailData.length > 0) {
                        this.thirdFormGroup = new FormGroup({
                            CaseID: new FormControl(this.caseId),
                            VehicleTypeID: new FormControl(this.VehicleDetailData[0].VehicleTypeID),
                            VehicleTypeName: new FormControl(this.VehicleDetailData[0].VehicleTypeName),
                            Registration_No: new FormControl(this.VehicleDetailData[0].Registration_No),
                            FitnessCertifyValidDate: new FormControl(this.VehicleDetailData[0].FitnessCertifyValidDate),
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

    getInsuranceDetails() {
        this.wizardService.pre_GetInsuranceDetails()
            .subscribe(res => {
                if (res && res.Status == 200) {
                    this.insuranceDetailsData = res.Data;
                    if (this.insuranceDetailsData.length > 0) {
                        this.ninethFormGroup = new FormGroup({
                            CaseID: new FormControl(this.caseId),
                            CaseProposerName: new FormControl(this.insuranceDetailsData[0].CaseProposerName),
                            CurrentInsurerName: new FormControl(JSON.parse(this.insuranceDetailsData[0].CurrentInsurerName)),
                            CurrentPolicyNo: new FormControl(this.insuranceDetailsData[0].CurrentPolicyNo),
                            PolicyStartDate: new FormControl(this.insuranceDetailsData[0].PolicyStartDate),
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
            })
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
        this.openDialog();
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


    // DIGITAL SIGNATURE IMAGE //
    imageToShow13: any;
    isImageLoading13: boolean = false;

    reateImageFromBlob13(image: Blob) {
        let reader = new FileReader();
        this.imageToShow13 = 'http://apiflacors.iflotech.in' + image;
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
            if (data.Data[0] !== null && data.Data[0] !== undefined) {
                this.reateImageFromBlob13(data.Data[0].SURVEYORSIGN);
            }
            this.isImageLoading13 = false;
        }, error => {
            this.isImageLoading13 = false;
            console.log(error);
        });
    }
}
