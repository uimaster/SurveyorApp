import { Component, OnInit, Input} from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {
  @Input() stepper: any;
  inspectionForm: FormGroup;
  inspectionData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;
  Loader = false;

  bodyColor = [
    { id: 1, name: 'Grey' },
    { id: 2, name: 'Black' },
    { id: 3, name: 'Black Patches' },    
    { id: 4, name: 'White' },
    { id: 5, name: 'White Patches' },    
    { id: 6, name: 'Brown' },
    { id: 7, name: 'Brown Patches' }
  ];

  animalBread = [
    { id: 1, name: 'Cow-Jersy' },
    { id: 2, name: 'Cow-HF' },
    { id: 3, name: 'Cow-Gir' },
    { id: 4, name: 'Cow-ND' },
    { id: 5, name: 'Buffalo-Surti' },
    { id: 6, name: 'Buffalo-Mehsani' },
    { id: 7, name: 'Buffalo-Murrah' },
    { id: 8, name: 'Buffalo-ND' }
  ];

  leftList = [
    { id: 1, name: 'Straight' },
    { id: 2, name: 'Sickel' },
    { id: 3, name: 'Cresent' },
    { id: 4, name: 'Rolled' },
    { id: 5, name: 'Stub' },
    { id: 6, name: 'NA' }
  ];

  rightList = [
    { id: 1, name: 'Straight' },
    { id: 2, name: 'Sickel' },
    { id: 3, name: 'Cresent' },
    { id: 4, name: 'Rolled' },
    { id: 5, name: 'Stub' },
    { id: 6, name: 'NA' }
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



  GenderArray = [
    { id: 1, name: 'Female' },
    { id: 2, name: 'Male' }
  ];

  isDelay = [
    { value: 1, name: 'Yes' },
    { value: 2, name: 'No' }
  ];

  constructor( private fb: FormBuilder, private inspectionService: SpotCattleService) {
    this.createInspectionForm();
  }

  ngOnInit() {
    this.getInspections();
  }

  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 222 ));
    if (preventsKey) {
     alert('Quote special character not allowed');
      return false;
    }
  }

  createInspectionForm() {
    this.inspectionForm = this.fb.group({
      CaseID : new FormControl(this.caseID),
      CaseNo : new FormControl(0),
      CaseTypeId : new FormControl(''),
      SurveyorsID : new FormControl(this.SurveyorsId),
      InspectionDate : new FormControl('', Validators.required),
      InspectionTime : new FormControl('', Validators.required),
      InspectionPlace : new FormControl('', Validators.required),
      InspectionDelay : new FormControl('', Validators.required),
      InspectionDelayReason : new FormControl('', Validators.required),
      Animal_EarTagNo : new FormControl('', Validators.required),
      Animal_sex : new FormControl(''),
      Animal_Color : new FormControl(''),
      Animal_Breed : new FormControl('', Validators.required),
      Animal_HornLeft : new FormControl('', Validators.required),
      Animal_HornRight : new FormControl('', Validators.required),
      Animal_Tail : new FormControl(''),
      Animal_Age : new FormControl(''),
      MarkOnForeHead : new FormControl(''),
      MarkOnBody : new FormControl(''),
    });
  }


  inspectionSubmit(formData) {
    this.Loader = true;
    if (this.inspectionForm.valid) {
      this.inspectionService.PostInspection(formData).subscribe( res => {
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
      });
    } else {
      console.log('invalid form');
      this.Loader = false;
    }

  }

  getInspections() {
    this.Loader = true;
    this.inspectionService.GetInspection().subscribe( res => {
      this.Loader = false;
      if (res) {
        if (res.Status === '200') {
          this.inspectionData = res.Data;
          if (this.inspectionData.length > 0) {
            this.inspectionForm.controls['CaseID'].setValue(this.inspectionData[0].CaseID || this.caseID);
            this.inspectionForm.controls['CaseNo'].setValue(this.inspectionData[0].CaseNo || this.caseNO);
            this.inspectionForm.controls['CaseTypeId'].setValue(this.inspectionData[0].CaseTypeId);
            this.inspectionForm.controls['SurveyorsID'].setValue(this.inspectionData[0].SurveyorsID || this.SurveyorsId);
            this.inspectionForm.controls['InspectionDate'].setValue(this.inspectionData[0].InspectionDate);
            this.inspectionForm.controls['InspectionTime'].setValue(this.inspectionData[0].InspectionTime);
            this.inspectionForm.controls['InspectionPlace'].setValue(this.inspectionData[0].InspectionPlace);
            this.inspectionForm.controls['InspectionDelay'].setValue(this.inspectionData[0].InspectionDelay);
            this.inspectionForm.controls['InspectionDelayReason'].setValue(this.inspectionData[0].InspectionDelayReason);
            this.inspectionForm.controls['Animal_EarTagNo'].setValue(this.inspectionData[0].Animal_EarTagNo);
            this.inspectionForm.controls['Animal_sex'].setValue(this.inspectionData[0].Animal_sex);
            this.inspectionForm.controls['Animal_Color'].setValue(this.inspectionData[0].Animal_Color);
            this.inspectionForm.controls['Animal_Breed'].setValue(this.inspectionData[0].Animal_Breed);
            this.inspectionForm.controls['Animal_HornLeft'].setValue(this.inspectionData[0].Animal_HornLeft);
            this.inspectionForm.controls['Animal_HornRight'].setValue(this.inspectionData[0].Animal_HornRight);
            this.inspectionForm.controls['Animal_Tail'].setValue(this.inspectionData[0].Animal_Tail);
            this.inspectionForm.controls['Animal_Age'].setValue(this.inspectionData[0].Animal_Age);
            this.inspectionForm.controls['MarkOnForeHead'].setValue(this.inspectionData[0].MarkOnForeHead);
            this.inspectionForm.controls['MarkOnBody'].setValue(this.inspectionData[0].MarkOnBody);
          }
        }
      }
    });
  }

}
