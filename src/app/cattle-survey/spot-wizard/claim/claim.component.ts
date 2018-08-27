import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  claimForm: FormGroup;

  constructor( private fb: FormBuilder) {
    this.createClaimForm();
   }

  ngOnInit() {
  }

  claimSubmit(formData) {
    console.log(formData);
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
      CaseID : new FormControl(0),
      CaseNo : new FormControl('0'),
      CaseDate : new FormControl(Date()),
      CompanyId : new FormControl(0),
      CompanyName : new FormControl(''),
      CaseTypeId : new FormControl(''),
      SurveyorsID : new FormControl(0),
      AssignedDateTime : new FormControl(Date()),
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
      RequesterName : new FormControl(''),
      RequesterCode : new FormControl(''),
      RequesterContactNo : new FormControl(''),
      District : new FormControl(''),
      State : new FormControl(''),
      InsuredContactNo : new FormControl(''),
      InspectionOfficialName : new FormControl(''),
      InspectionOfficialContactNo : new FormControl('')
    });
  }

}
