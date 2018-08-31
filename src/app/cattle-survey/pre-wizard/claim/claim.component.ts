import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PreCattleService } from '../../pre-wizard/pre-wizard.service';

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
  constructor(
    private fb: FormBuilder,
    private claimService: PreCattleService
  ) {
    this.createClaimForm();
   }

  ngOnInit() {
    this.getClaimDetails();
  }



  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
     key === 57 || key === 186 ));
    if (preventsKey) {
     console.log('Special characters not allowed');
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
      IntimationDate : new FormControl('', Validators.required),
      IntimationTime : new FormControl('', Validators.required),
      IntimationLocation : new FormControl('', Validators.required),
      State : new FormControl('', Validators.required),
      InsuredContactNo : new FormControl(''),
      InspectionOfficialName : new FormControl(''),
      InspectionOfficialContactNo : new FormControl('')
    });
  }

  getClaimDetails() {
    this.claimService.GetClaimDetails().subscribe((res) => {
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
    this.claimService.PostClaimDetails(formData).subscribe(res => {
      if (res) {
        if (res.Status === '200') {
          this.successMessage = res.Message;
          this.showSuccess = true;
          setTimeout(() => {
            this.stepper.next();
          }, 2000);
        } else {
          this.errorMessage = res.Message;
          this.showError = true;
        }
      }
    });
  }

}
