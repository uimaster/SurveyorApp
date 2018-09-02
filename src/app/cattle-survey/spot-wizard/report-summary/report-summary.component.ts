import { Component, OnInit } from '@angular/core';
import { SpotCattleService } from '../spot-wizard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {
  StatusData = [];
  summaryForm: FormGroup;
  Loader = false;
  constructor( private summaryReportService: SpotCattleService, private fb: FormBuilder) {
    this.creareSummaryForm();
  }

  ngOnInit() {
    this.getSummaryReport();
  }

  creareSummaryForm() {
    this.summaryForm = this.fb.group({
      ClaimformStatus: new FormControl(),
      DeadAnimalPhotoStatus: new FormControl(),
      IntactEarTagStatus: new FormControl(),
      PMReportStatus: new FormControl(),
    });
  }

  getSummaryReport() {
    this.Loader = true;
    this.summaryReportService.GetSummaryDetails().subscribe( res => {
      this.Loader = false;
      if (res && res.Status === '200' && res.Data != null) {
        this.StatusData = res.Data;
        if (this.StatusData !== undefined && this.StatusData.length > 0) {
          this.summaryForm.controls['ClaimformStatus'].setValue(this.StatusData[0].ClaimformStatus);
          this.summaryForm.controls['DeadAnimalPhotoStatus'].setValue(this.StatusData[0].DeadAnimalPhotoStatus);
          this.summaryForm.controls['IntactEarTagStatus'].setValue(this.StatusData[0].IntactEarTagStatus);
          this.summaryForm.controls['PMReportStatus'].setValue(this.StatusData[0].PMReportStatus);
        }
      }
    });
  }


  summarySubmit(formData) {
    console.log(formData);
  }


}
