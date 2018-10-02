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

  bodyColor = [
    { id: 1, name: 'Black' },
    { id: 2, name: 'Grey' },
    { id: 3, name: 'White' },
    { id: 4, name: 'Black Patches' },
    { id: 5, name: 'Brown Patches' }
  ];

  animalBread = [
    { id: 1, name: 'Cow' },
    { id: 2, name: 'Jersy' },
    { id: 3, name: 'HF' },
    { id: 4, name: 'Gir' },
    { id: 5, name: 'ND' },
    { id: 6, name: 'Buffalo' },
    { id: 7, name: 'Surti' },
    { id: 8, name: 'Mehsani' },
    { id: 9, name: 'Murrah' }
  ];

  leftList = [
    { id: 1, name: 'Straight' },
    { id: 2, name: 'Sickel' },
    { id: 3, name: 'Cresent' },
    { id: 4, name: 'Rolled' },
    { id: 5, name: 'Stub' }
  ];

  rightList = [
    { id: 1, name: 'Straight' },
    { id: 2, name: 'Sickel' },
    { id: 3, name: 'Cresent' },
    { id: 4, name: 'Rolled' },
    { id: 5, name: 'Stub' }
  ];

  tailEnd = [
    { id: 1, name: 'White' },
    { id: 2, name: 'Black' },
    { id: 3, name: 'Brown' },
    { id: 4, name: 'NA' }
  ];

  ageList = [
    { id: 1, age: '0-1' },
    { id: 2, age: '1-2' },
    { id: 3, age: '2-3' },
    { id: 4, age: '3-4' },
    { id: 1, age: '4-5' },
    { id: 2, age: '5-6' },
    { id: 3, age: '6-7' },
    { id: 4, age: '7-8' },
    { id: 1, age: '8-9' }
  ];

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
