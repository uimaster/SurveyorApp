import { Component, OnInit } from '@angular/core';
import { SpotCattleService } from '../spot-wizard.service';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {
  StatusData = [];
  constructor( private summaryReportService: SpotCattleService) {}

  ngOnInit() {
    this.getSummaryReport();
  }

  getSummaryReport() {
    this.summaryReportService.GetSummaryDetails().subscribe( res => {
      if (res && res.Status === '200' && res.Data != null) {
        this.StatusData = res.Data;
      }
    });
  }





}
