import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PreCattleService } from '../pre-wizard.service';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() stepper: any;
  descriptionForm: FormGroup;
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
    this.createDescriptionForm();
   }

  ngOnInit() {
    this.getDescription();
  }



  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 222 ));
    if (preventsKey) {
     alert('Quote special character not allowed');
      return false;
    }
  }

  createDescriptionForm() {
    this.descriptionForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      Animal_EarTagNo : new FormControl('', Validators.required),
      Animal_sex : new FormControl('', Validators.required),
      Animal_Breed : new FormControl('', Validators.required),
      Animal_Color : new FormControl('', Validators.required),
      Animal_HornLeft : new FormControl('', Validators.required),
      Animal_HornRight : new FormControl('', Validators.required),
      Animal_Tail : new FormControl('', Validators.required),
      Animal_Age : new FormControl('', Validators.required),
      MarkOnForeHead : new FormControl('', Validators.required),
      MarkOnBody : new FormControl('', Validators.required),
    });
  }

  getDescription() {
    this.Loader = true;
    this.descriptionService.GetDescription().subscribe((res) => {
      this.Loader = false;
      if (res) {
        if (res.Status === '200') {
          this.responseData = res.Data;
          if (this.responseData !== undefined && this.responseData.length > 0) {
            this.descriptionForm.controls['Animal_EarTagNo'].setValue(this.responseData[0].Animal_EarTagNo);
            this.descriptionForm.controls['Animal_sex'].setValue(this.responseData[0].Animal_sex);
            this.descriptionForm.controls['Animal_Breed'].setValue(this.responseData[0].Animal_Breed);
            this.descriptionForm.controls['Animal_Color'].setValue(this.responseData[0].Animal_Color);
            this.descriptionForm.controls['Animal_HornLeft'].setValue(this.responseData[0].Animal_HornLeft);
            this.descriptionForm.controls['Animal_HornRight'].setValue(this.responseData[0].Animal_HornRight);
            this.descriptionForm.controls['Animal_Tail'].setValue(this.responseData[0].Animal_Tail);
            this.descriptionForm.controls['Animal_Age'].setValue(this.responseData[0].Animal_Age);
            this.descriptionForm.controls['MarkOnForeHead'].setValue(this.responseData[0].MarkOnForeHead);
            this.descriptionForm.controls['MarkOnBody'].setValue(this.responseData[0].MarkOnBody);
          }
          console.log(this.descriptionForm);
        }
      }
    });
  }

  descriptionSubmit(formData) {
    this.Loader = true;
    if (this.descriptionForm.valid) {
      this.descriptionService.PostDescription(formData).subscribe(res => {
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
