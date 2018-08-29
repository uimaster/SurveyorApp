import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.scss']
})
export class ProofComponent implements OnInit {
  proofForm: FormGroup;
  proofData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;

  constructor( private fb: FormBuilder, private proofService: SpotCattleService) {
    this.createProofForm();
  }

  ngOnInit() {
    this.getProofDetails();
  }

  createProofForm() {
    this.proofForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      SurveyEarTagStatus : new FormControl('', Validators.required),
      SurveyAnimalVerifiedStatus : new FormControl('', Validators.required),
      SurveyAnimalReTagged : new FormControl('', Validators.required),
      SurveyEarTagRemovalStatus : new FormControl('', Validators.required),
      SurveyEarTagPreserveStatus : new FormControl('', Validators.required),
    });
  }
  getProofDetails() {
    this.proofService.GetProofDetails().subscribe( res => {
      if (res) {
        if (res.Status === '200') {
          this.proofData = res.Data;
          if (this.proofData.length > 0) {
            this.proofForm.controls['CaseID'].setValue(this.proofData[0].CaseID || this.caseID);
            this.proofForm.controls['SurveyEarTagStatus'].setValue(this.proofData[0].SurveyEarTagStatus);
            this.proofForm.controls['SurveyAnimalVerifiedStatus'].setValue(this.proofData[0].SurveyAnimalVerifiedStatus);
            this.proofForm.controls['SurveyAnimalReTagged'].setValue(this.proofData[0].SurveyAnimalReTagged);
            this.proofForm.controls['SurveyEarTagRemovalStatus'].setValue(this.proofData[0].SurveyEarTagRemovalStatus);
            this.proofForm.controls['SurveyEarTagPreserveStatus'].setValue(this.proofData[0].SurveyEarTagPreserveStatus);
          }
        }
      }
    });
  }

  proofSubmit(formData) {
    this.proofService.PostProofDetails(formData).subscribe( res => {
      if (res.Status === '200') {
        this.successMessage = res.Message;
        this.showSuccess = true;
      } else {
        this.errorMessage = res.Message;
        this.showError = true;
      }
    });
  }
}
