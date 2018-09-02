import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PreCattleService } from '../pre-wizard.service';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent implements OnInit {
  @Input() stepper: any;
  otherInfoForm: FormGroup;
  responseData = [];
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
    private descriptionService: PreCattleService
  ) {
    this.createOtherInfoForm();
   }

  ngOnInit() {
    this.getOtherInfo();
  }



  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 222 ));
    if (preventsKey) {
     alert('Quote special character not allowed');
      return false;
    }
  }

  createOtherInfoForm() {
    this.otherInfoForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      Financer_Name : new FormControl('', Validators.required),
      Financer_Place : new FormControl('', Validators.required),
      Animal_Valuation : new FormControl('', Validators.required),
      Enquiry_Remarks : new FormControl('', Validators.required)
    });
  }

  getOtherInfo() {
    this.Loader = true;
    this.descriptionService.GetOtherInfo().subscribe((res) => {
      this.Loader = false;
      if (res) {
        if (res.Status === '200') {
          this.responseData = res.Data;
          if (this.responseData !== undefined && this.responseData.length > 0) {
            this.otherInfoForm.controls['Financer_Name'].setValue(this.responseData[0].Financer_Name);
            this.otherInfoForm.controls['Financer_Place'].setValue(this.responseData[0].Financer_Place);
            this.otherInfoForm.controls['Animal_Valuation'].setValue(this.responseData[0].Animal_Valuation);
            this.otherInfoForm.controls['Enquiry_Remarks'].setValue(this.responseData[0].Enquiry_Remarks);
          }
          console.log(this.otherInfoForm);
        }
      }
    });
  }

  otherInfoSubmit(formData) {
    this.Loader = true;
    if(this.otherInfoForm.valid) {
      this.descriptionService.PostOtherInfo(formData).subscribe(res => {
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

}
