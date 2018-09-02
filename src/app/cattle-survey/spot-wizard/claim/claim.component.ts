import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input} from '@angular/core';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-claim',
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
  constructor(
    private fb: FormBuilder,
    private claimService: SpotCattleService
  ) {
    this.createClaimForm();
   }

  ngOnInit() {
    this.getClaimDetails();
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
      PolicyNo : new FormControl('', Validators.required),
      EarTagNo : new FormControl('', Validators.required),
      ScheduleNo : new FormControl('', Validators.required),
      SLNo : new FormControl('', Validators.required),
      InsuredName : new FormControl('', Validators.required),
      InsuredAddress : new FormControl('', Validators.required),
      Village : new FormControl('', Validators.required),
      IntimationDate : new FormControl('', Validators.required),
      IntimationTime : new FormControl('', Validators.required),
      IntimationLocation : new FormControl('', Validators.required),
      DelayInIntimation : new FormControl('', Validators.required),
      IntimationDelayReason : new FormControl(''),
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
            this.claimForm.controls['PolicyNo'].setValue(this.claimData[0].PolicyNo);
            this.claimForm.controls['EarTagNo'].setValue(this.claimData[0].EarTagNo);
            this.claimForm.controls['ScheduleNo'].setValue(this.claimData[0].ScheduleNo);
            this.claimForm.controls['SLNo'].setValue(this.claimData[0].SLNo);
            this.claimForm.controls['InsuredName'].setValue(this.claimData[0].InsuredName);
            this.claimForm.controls['InsuredAddress'].setValue(this.claimData[0].InsuredAddress);
            this.claimForm.controls['Village'].setValue(this.claimData[0].Village);
            this.claimForm.controls['IntimationDate'].setValue(this.claimData[0].IntimationDate);
            this.claimForm.controls['IntimationTime'].setValue(this.claimData[0].IntimationTime);
            this.claimForm.controls['IntimationLocation'].setValue(this.claimData[0].IntimationLocation);
            this.claimForm.controls['DelayInIntimation'].setValue(this.claimData[0].DelayInIntimation);
            this.claimForm.controls['IntimationDelayReason'].setValue(this.claimData[0].IntimationDelayReason);
          }
          console.log(this.claimForm);
        }
      }
    });
  }

  claimSubmit(formData) {
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
      console.log('Invalid form.');
      this.Loader = false;
    }
  }

}
