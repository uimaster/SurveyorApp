import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PreCattleService } from '../../pre-wizard/pre-wizard.service';
import { SharedModuleServices } from '../../../sharedModule/shared.service';


@Component({
  selector: 'app-claim-pre',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  @Input() stepper: any;
  claimForm: FormGroup;
  claimData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;
  Loader = false;
  companyList = [];
  constructor(
    private fb: FormBuilder,
    private claimService: PreCattleService,
    private shareService: SharedModuleServices
  ) {
    this.createClaimForm();
   }

  ngOnInit() {
    this.getClaimDetails();
    this.getCompanyList();
  }



  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 222 ));
    if (preventsKey) {
     alert('Quote special character not allowed');
      return false;
    }
  }

  createClaimForm() {
    this.claimForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      CaseNo : new FormControl(this.caseNO || 0),
      CaseTypeId : new FormControl(0),
      CompanyId: new FormControl(0),
      SurveyorsID : new FormControl(this.SurveyorsId || 0),
      RequesterCode : new FormControl('', Validators.required),
      RequesterName : new FormControl('', Validators.required),
      RequesterContactNo : new FormControl('', Validators.required),
      ScheduleNo : new FormControl('', Validators.required),
      District : new FormControl('', Validators.required),
      InsuredName : new FormControl('', Validators.required),
      InsuredAddress : new FormControl('', Validators.required),
      Village : new FormControl('', Validators.required),
      IntimationDate : new FormControl(''),
      IntimationTime : new FormControl(''),
      IntimationLocation : new FormControl(''),
      State : new FormControl(''),
      InsuredContactNo : new FormControl(''),
      InspectionOfficialName : new FormControl(''),
      InspectionOfficialContactNo : new FormControl('')
    });
  }

  getClaimDetails() {
    this.Loader = true;
    this.claimService.GetClaimDetails().subscribe((res) => {
      this.Loader = false;
      if (res) {
        if (res.Status === '200') {
          this.claimData = res.Data;
          if (this.claimData.length > 0) {
            this.claimForm.controls['CaseTypeId'].setValue(this.claimData[0].CaseTypeId || 0);
            this.claimForm.controls['CompanyId'].setValue(this.claimData[0].CompanyId || 0);
            this.claimForm.controls['RequesterCode'].setValue(this.claimData[0].RequesterCode);
            this.claimForm.controls['RequesterName'].setValue(this.claimData[0].RequesterName);
            this.claimForm.controls['RequesterContactNo'].setValue(this.claimData[0].RequesterContactNo);
            this.claimForm.controls['ScheduleNo'].setValue(this.claimData[0].ScheduleNo);
            this.claimForm.controls['InsuredName'].setValue(this.claimData[0].InsuredName);
            this.claimForm.controls['InsuredAddress'].setValue(this.claimData[0].InsuredAddress);
            this.claimForm.controls['Village'].setValue(this.claimData[0].Village);
            this.claimForm.controls['IntimationDate'].setValue(this.claimData[0].IntimationDate);
            this.claimForm.controls['IntimationTime'].setValue(this.claimData[0].IntimationTime);
            this.claimForm.controls['IntimationLocation'].setValue(this.claimData[0].IntimationLocation);
            this.claimForm.controls['District'].setValue(this.claimData[0].District);
            this.claimForm.controls['State'].setValue(this.claimData[0].State);
            this.claimForm.controls['InsuredContactNo'].setValue(this.claimData[0].InsuredContactNo);
            this.claimForm.controls['InspectionOfficialName'].setValue(this.claimData[0].InspectionOfficialName);
            this.claimForm.controls['InspectionOfficialContactNo'].setValue(this.claimData[0].InspectionOfficialContactNo);
          }
          console.log(this.claimForm);
        }
      }
    });
  }

  claimSubmit(formData) {
    debugger;
    this.Loader = true;
    if (this.claimForm.valid) {
      this.claimService.PostClaimDetails(formData).subscribe(res => {
        if (res) {
          if (res.Status === '200') {
            this.successMessage = res.Message;
            this.showSuccess = true;
            setTimeout(() => {
              this.stepper.next();
            }, 2000);
            this.Loader = false;
          } else {
            this.errorMessage = res.Message;
            this.showError = true;
            this.Loader = false;
          }
        }
      });
    } else {
      console.log('invalid form');
      this.Loader = false;
    }
  }

  getCompanyList() {
    this.shareService.getCompanyList().subscribe( res => {
      if (res) {
        if (res.Status === '200') {
          this.companyList = res.Data;
        } else {
          console.log(res.Message);
        }
      }
    });
  }

}
