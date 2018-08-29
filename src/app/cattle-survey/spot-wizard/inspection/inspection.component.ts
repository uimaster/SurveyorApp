import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {
  inspectionForm: FormGroup;
  inspectionData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;

  colorArray = [
    { colorID: 1, colorName: 'White' },
    { colorID: 2, colorName: 'Black' },
    { colorID: 3, colorName: 'Green' },
    { colorID: 4, colorName: 'Yellow' },
    { colorID: 5, colorName: 'Blue' },
    { colorID: 6, colorName: 'Red' },
    { colorID: 7, colorName: 'Maroon' },
  ];

  GenderArray = [
    { genderID: 1, genderName: 'Female U' },
    { genderID: 2, genderName: 'Male U' }
  ];

  constructor( private fb: FormBuilder, private inspectionService: SpotCattleService) {
    this.createInspectionForm();
  }

  ngOnInit() {
    this.getInspections();
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
      Animal_sex : new FormControl('', Validators.required),
      Animal_Color : new FormControl('', Validators.required),
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
    this.inspectionService.PostInspection(formData).subscribe( res => {
      if(res.Status === '200') {
        this.successMessage = res.Message;
        this.showSuccess = true;
      } else {
        this.errorMessage = res.Message;
        this.showError = true;
      }
    });
  }

  getInspections() {
    this.inspectionService.GetInspection().subscribe( res => {
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
