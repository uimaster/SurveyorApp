import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-inquary-second',
  templateUrl: './enquiry-second.component.html',
  styleUrls: ['./enquiry-second.component.scss']
})
export class InquarySecondComponent implements OnInit {
  EnquirySecondForm: FormGroup;
  enquiryData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;
  constructor( private fb: FormBuilder, private enquiryService: SpotCattleService) {
    this.createEnquirySecondForm();
  }

  ngOnInit() {
    this.getEnquiryTwoDetails();
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

  createEnquirySecondForm() {
    this.EnquirySecondForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      Financer_Name : new FormControl('', Validators.required),
      Financer_Place : new FormControl('', Validators.required),
      Animal_Valuation : new FormControl('', Validators.required),
      Enquiry_Remarks : new FormControl('', Validators.required),
    });
  }

  EnquirySecondSubmit(formData) {
    this.enquiryService.PostEnquirytwoDetails(formData).subscribe( res => {
      if(res.Status === '200') {
        this.successMessage = res.Message;
        this.showSuccess = true;
      } else {
        this.errorMessage = res.Message;
        this.showError = true;
      }
    });
  }

  getEnquiryTwoDetails() {
    this.enquiryService.GetEnquirytwoDetails().subscribe( res => {
      if (res) {
        if (res.Status === '200') {
          this.enquiryData = res.Data;
          if (this.enquiryData.length > 0) {
            this.EnquirySecondForm.controls['CaseID'].setValue(this.enquiryData[0].CaseID || this.caseID);
            this.EnquirySecondForm.controls['Financer_Name'].setValue(this.enquiryData[0].Financer_Name);
            this.EnquirySecondForm.controls['Financer_Place'].setValue(this.enquiryData[0].Financer_Place);
            this.EnquirySecondForm.controls['Animal_Valuation'].setValue(this.enquiryData[0].Animal_Valuation);
            this.EnquirySecondForm.controls['Enquiry_Remarks'].setValue(this.enquiryData[0].Enquiry_Remarks);
          }
        }
      }
    });
  }
}
