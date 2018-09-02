import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-inquary-one',
  templateUrl: './enquiry-one.component.html',
  styleUrls: ['./enquiry-one.component.scss']
})
export class InquaryOneComponent implements OnInit {
  @Input() stepper: any;
  inquaryFirstForm: FormGroup;
  enquiryData = [];
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSuccess = false;
  showError = false;
  successMessage: string;
  errorMessage: string;
  Loader = false;
  constructor( private fb: FormBuilder, private enquiryService: SpotCattleService) {
    this.createInquaryFirstForm();
  }

  ngOnInit() {
    this.getEnquiryDetails();
  }

  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 222 ));
    if (preventsKey) {
     alert('Quote special character not allowed');
      return false;
    }
  }

  createInquaryFirstForm() {
    this.inquaryFirstForm = this.fb.group({
      CaseID : new FormControl(this.caseID || 0),
      Animal_Illness_Date : new FormControl('', Validators.required),
      Animal_Illness : new FormControl('', Validators.required),
      Vetnary_Doctor_Remarks : new FormControl('', Validators.required),
      Insured_Remarks : new FormControl('', Validators.required),
      Locals_Remarks : new FormControl('', Validators.required),
      Vetnary_Doctor_Name : new FormControl('', Validators.required),
      Animal_NotTreatedReason : new FormControl('', Validators.required),
      Animal_ProductivtyInLtrs : new FormControl('', Validators.required),
      Animal_MilkPurchaser : new FormControl('', Validators.required),
      VetnaryHospitalRecords_Status : new FormControl('', Validators.required),
      SocietyDoctorReport_Status : new FormControl('', Validators.required),
      Medical_Bills_Status : new FormControl(''),
    });
  }

  inquaryFirstSubmit(formData) {
    this.Loader = true;
    if (this.inquaryFirstForm.valid) {
      this.enquiryService.PostEnquiryoneDetails(formData).subscribe( res => {

        if(res.Status === '200') {
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
      console.log('invalid forms');
      this.Loader = false;
    }
  }

  getEnquiryDetails() {
    this.Loader = true;
    this.enquiryService.GetEnquiryoneDetails().subscribe( res => {
      this.Loader = false;
      if (res) {
        if (res.Status === '200') {
          this.enquiryData = res.Data;
          if (this.enquiryData.length > 0) {
            this.inquaryFirstForm.controls['CaseID'].setValue(this.enquiryData[0].CaseID || this.caseID);
            this.inquaryFirstForm.controls['Animal_Illness_Date'].setValue(this.enquiryData[0].Animal_Illness_Date);
            this.inquaryFirstForm.controls['Animal_Illness'].setValue(this.enquiryData[0].Animal_Illness);
            this.inquaryFirstForm.controls['Vetnary_Doctor_Remarks'].setValue(this.enquiryData[0].Vetnary_Doctor_Remarks);
            this.inquaryFirstForm.controls['Insured_Remarks'].setValue(this.enquiryData[0].Insured_Remarks);
            this.inquaryFirstForm.controls['Locals_Remarks'].setValue(this.enquiryData[0].Locals_Remarks);
            this.inquaryFirstForm.controls['Vetnary_Doctor_Name'].setValue(this.enquiryData[0].Vetnary_Doctor_Name);
            this.inquaryFirstForm.controls['Animal_NotTreatedReason'].setValue(this.enquiryData[0].Animal_NotTreatedReason);
            this.inquaryFirstForm.controls['Animal_ProductivtyInLtrs'].setValue(this.enquiryData[0].Animal_ProductivtyInLtrs);
            this.inquaryFirstForm.controls['Animal_MilkPurchaser'].setValue(this.enquiryData[0].Animal_MilkPurchaser);
            this.inquaryFirstForm.controls['VetnaryHospitalRecords_Status'].setValue(this.enquiryData[0].VetnaryHospitalRecords_Status);
            this.inquaryFirstForm.controls['SocietyDoctorReport_Status'].setValue(this.enquiryData[0].SocietyDoctorReport_Status);
            this.inquaryFirstForm.controls['Medical_Bills_Status'].setValue(this.enquiryData[0].Medical_Bills_Status);
          }
        }
      }
    });
  }

}
