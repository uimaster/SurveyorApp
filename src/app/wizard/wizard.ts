import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import{ WizardService } from './wizard.service';

@Component({
  selector: 'wizard-selector',
  templateUrl: './wizard.html',
  styleUrls: ['./wizard.scss']
})
export class WizardComponent implements OnInit {
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
  successMessage:string;
  errorMessage:string;
  showError: boolean = false;
  showSuccess: boolean = false;
  caseId: any;

  constructor(private _formBuilder: FormBuilder, private wizardService:WizardService ) {

    this.firstFormGroup = new FormGroup({
        CaseID: new FormControl(''),
        CaseNo: new FormControl(''),
        claimNo: new FormControl('', Validators.required),
        policyNo: new FormControl('', Validators.required),
        CompanyId: new FormControl(''),
        InsuredName:  new FormControl('', Validators.required),
        InsuredAddress:  new FormControl('', Validators.required),
        InsuredMobile:  new FormControl('', Validators.required),
        EmailID:  new FormControl('', Validators.required)
    });

    this.secondFormGroup = new FormGroup({
        CaseID: new FormControl(''),
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
        CaseID: new FormControl('',Validators.required),
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
        CaseID: new FormControl('',Validators.required),
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

    
    

   }

  ngOnInit() {
    this.getClaimDetails();    
    this.getVehicleDetails();
    this.getDriverDetails();
    this.getAccidentDetails();
    this.sixthFormGroup = this._formBuilder.group({
        sixthCtrl: ['', Validators.required]
    });
    this.seventhFormGroup = this._formBuilder.group({
        seventhCtrl: ['', Validators.required]
    });
    this.eightthFormGroup = this._formBuilder.group({
        eightthCtrl: ['', Validators.required]
    });
    this.ninethFormGroup = this._formBuilder.group({
        ninethCtrl: ['', Validators.required]
    });
    this.tenthFormGroup = this._formBuilder.group({
        tenthCtrl: ['', Validators.required]
    });

   
  }


  getClaimDetails(){
    this.caseId = localStorage.getItem('CaseID');
    this.wizardService.getClaimDetails()
    .subscribe(res =>{
      if(res.status = 200){
        this.claimDetailData = res.SurveyCases4;
        this.firstFormGroup = new FormGroup({
            CaseID: new FormControl(this.caseId),
            CaseNo: new FormControl(''),
            claimNo: new FormControl(this.claimDetailData[0].ClaimNO, Validators.required),
            policyNo: new FormControl(this.claimDetailData[0].PolicyNO, Validators.required),
            CompanyId: new FormControl(''),
            InsuredName:  new FormControl(this.claimDetailData[0].InsuredName, Validators.required),
            InsuredAddress:  new FormControl(this.claimDetailData[0].InsuredAddress, Validators.required),
            InsuredMobile:  new FormControl(this.claimDetailData[0].InsuredMobile, Validators.required),
            EmailID:  new FormControl('', Validators.required)
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

        console.log(this.claimDetailData);
      }
    })
  }

  getVehicleDetails(){
    this.wizardService.getVehicleDetails()
    .subscribe(res =>{
      if(res.status = 200){
        this.VehicleDetailData = res.SurveyCases;
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

        console.log("vehicle Details:"+JSON.stringify(this.VehicleDetailData));
      }
    })
  }

  getDriverDetails(){
    this.caseId = localStorage.getItem('CaseID');
    this.wizardService.getDriverDetails()
    .subscribe(res =>{
      if(res.status = 200){
        this.driverData = res.SurveyCases2;
        // this.fourthFormGroup = new FormGroup({
        //     CaseDriverID: new FormControl(this.driverData[0].CaseDriverID),
        //     CaseID: new FormControl(this.driverData[0].CaseID),
        //     Drivername: new FormControl(this.driverData[0].Drivername),
        //     DriverLicenseNo: new FormControl(this.driverData[0].DriverLicenseNo),
        //     IssuingAuthority: new FormControl(this.driverData[0].IssuingAuthority),
        //     ValidUptoDate:  new FormControl(this.driverData[0].ValidUptoDate),
        //     TypeOfLicense: new FormControl(this.driverData[0].TypeOfLicense),
        //     PSVBadgeNo: new FormControl(this.driverData[0].PSVBadgeNo),
        //     DOB: new FormControl(this.driverData[0].DOB),
        //     Age: new FormControl(this.driverData[0].Age),
        //     DLEndorsment: new FormControl(this.driverData[0].DLEndorsment),
        //     IssueDate: new FormControl(this.driverData[0].IssueDate)
        // });

        console.log("DriverData:", this.driverData);
      }
    })
  }

  getAccidentDetails(){
  this.caseId = localStorage.getItem('CaseID');
  this.wizardService.geAccidentDetails()
  .subscribe(res =>{
    if(res.status = 200){
      this.accidentData = res.SurveyCases12;     

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

      console.log("AccidentData:", this.accidentData);
    }
  })
}

  firstStepSubmit(formdata){
    if(this.firstFormGroup.valid){
        this.wizardService.postClaimDetails(this.firstFormGroup.value).subscribe(data =>{
            // if(data && data.status_code==200){
            if(data){
                this.successMessage = data.message;
                this.showError = false;
                this.showSuccess = true;                
                console.log(data);		
            }
            else{
                this.errorMessage = data.message;
                this.showError = true;
                this.showSuccess = false;
                console.log(data);
            }
        }, error =>{
            this.errorMessage = error;
        })			
    }
  }

  secondStepSubmit(formdata){
    if(this.secondFormGroup.valid){
        this.wizardService.postSurveyorDetails(this.secondFormGroup.value).subscribe(data =>{
            // if(data && data.status_code==200){
            if(data){
                this.successMessage = data.message;
                this.showError = false;
                this.showSuccess = true;                
                console.log(data);		
            }
            else{
                this.errorMessage = data.message;
                this.showError = true;
                this.showSuccess = false;
                console.log(data);
            }
        }, error =>{
            this.errorMessage = error;
        })			
    }
  }

  thirdStepSubmit(formdata){
    if(this.thirdFormGroup.valid){
      this.wizardService.postVehicleDetails(this.thirdFormGroup.value).subscribe(data =>{
          // if(data && data.status_code==200){
          if(data){
              this.successMessage = data.message;
              this.showError = false;
              this.showSuccess = true;                
              console.log(data);		
          }
          else{
              this.errorMessage = data.message;
              this.showError = true;
              this.showSuccess = false;
              console.log(data);
          }
      }, error =>{
          this.errorMessage = error;
      })			
    }
}

fourthSubmit(formdata){
    if(this.fourthFormGroup.valid){
      this.wizardService.postDriverDetails(this.fourthFormGroup.value).subscribe(data =>{
          // if(data && data.status_code==200){
          if(data){
              this.successMessage = data.message;
              this.showError = false;
              this.showSuccess = true;                
              console.log(data);		
          }
          else{
              this.errorMessage = data.message;
              this.showError = true;
              this.showSuccess = false;
              console.log(data);
          }
      }, error =>{
          this.errorMessage = error;
      })			
    }
}

fifthSubmit(formdata){
    if(this.fifthFormGroup.valid){
      this.wizardService.postAccidentDetails(this.fifthFormGroup.value).subscribe(data =>{
          // if(data && data.status_code==200){
          if(data){
              this.successMessage = data.message;
              this.showError = false;
              this.showSuccess = true;                
              console.log(data);		
          }
          else{
              this.errorMessage = data.message;
              this.showError = true;
              this.showSuccess = false;
              console.log(data);
          }
      }, error =>{
          this.errorMessage = error;
      })			
    }
}

  

}
