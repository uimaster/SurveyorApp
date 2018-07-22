import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { TabsService } from './tabs.service';
import { TabsResponse, TabsGenericResponse} from './tabs.model';
import { DashboardComponent } from '../dashboard';

@Component({
  selector: 'tabs-selector',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
})
export class DashboardTabComponent implements OnInit {
  public AllocatedCases = 0;
  public CompletedCases  = 0;
  public UnderProcessCases  = 0;
  public TotalCases  = 0;
  public BroadCastCase  = 0;
  showActiveAll = true;
  showActiveCompleted = false;
  showActiveUnderProcess = false;
  userId = 0;

  constructor( private tabsServices: TabsService, private dashboard: DashboardComponent){}

  getTabCounts(data) {
    this.tabsServices.getTabCounts(data)
    .subscribe((res) => {
      if(res && res.Status === '200') {
        this.AllocatedCases = res.Data[0].AllocatedCaseCount;
        this.CompletedCases = res.Data[0].CompletedCaseCount;
        this.UnderProcessCases = res.Data[0].UnderProcessCaseCount;
        this.BroadCastCase = res.Data[0].BroadCaseCount;
        this.TotalCases = res.Data[0].TotalCaseCount;
      }
    });
  }

  getAllCases() {
    this.dashboard.getDashboardList();
    this.showActiveAll = true;
    this.showActiveCompleted = false;
    this.showActiveUnderProcess = false;
  }

  getCompleteCases() {
    this.dashboard.getCompletedList();
    this.showActiveAll = false;
    this.showActiveCompleted = true;
    this.showActiveUnderProcess = false;
  }

  getUnderProcessCases() {
    this.dashboard.getProcessList();
    this.showActiveAll = false;
    this.showActiveCompleted = false;
    this.showActiveUnderProcess = true;
  }


  ngOnInit() {
    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    if (userTypeId === 1) {
      this.userId = 0;
    } else if (userTypeId === 2) {
      this.userId = 0;
    } else if (userTypeId === 3) {
      this.userId = 0;
    } else if (userTypeId === 4) {
      this.userId = JSON.parse(localStorage.getItem('UserId'));
    }
    this.getTabCounts(this.userId);
  }
}
