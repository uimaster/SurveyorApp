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
  constructor( private summaryReportService: SpotCattleService, private fb: FormBuilder) {
    this.creareSummaryForm();
  }

  ngOnInit() {
    this.getSummaryReport();
  }

  creareSummaryForm() {
    this.summaryForm = this.fb.group({
      ClaimformStatus: new FormControl(0),
      DeadAnimalPhotoStatus: new FormControl(0),
      IntactEarTagStatus: new FormControl(0),
      PMReportStatus: new FormControl(0),
    });
  }

  getSummaryReport() {
    this.summaryReportService.GetSummaryDetails().subscribe( res => {
      if (res && res.Status === '200' && res.Data != null) {
        this.StatusData = res.Data;
        if (this.StatusData !== undefined && this.StatusData.length > 0) {
          this.summaryForm.controls['ClaimformStatus'].setValue(JSON.stringify(this.StatusData[0].ClaimformStatus));
          this.summaryForm.controls['DeadAnimalPhotoStatus'].setValue(JSON.stringify(this.StatusData[0].DeadAnimalPhotoStatus));
          this.summaryForm.controls['IntactEarTagStatus'].setValue(JSON.stringify(this.StatusData[0].IntactEarTagStatus));
          this.summaryForm.controls['PMReportStatus'].setValue(JSON.stringify(this.StatusData[0].PMReportStatus));
        }
      }
    });
  }


  summarySubmit(formData) {
    console.log(formData);
  }


}
