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
  public AllocatedCases: number = 0;
  public CompletedCases : number = 0;
  public UnderProcessCases : number = 0;
  public TotalCases : number = 0;
  public BroadCastCase : number = 0;
  showActiveAll: boolean = true;
  showActiveCompleted: boolean = false;
  showActiveUnderProcess: boolean = false;

  constructor( private tabsServices: TabsService, private dashboard: DashboardComponent){}

  getTabCounts(){
    this.tabsServices.getTabCounts()
    .subscribe((res) =>{
      if(res && res.Status == 200){
        this.AllocatedCases = res.Data[0].AllocatedCaseCount;
        this.CompletedCases = res.Data[0].CompletedCaseCount;
        this.UnderProcessCases = res.Data[0].UnderProcessCaseCount;
        this.BroadCastCase = res.Data[0].BroadCaseCount;
        this.TotalCases = res.Data[0].TotalCaseCount;
      }
    })
  }

  getAllCases(){
    this.dashboard.getDashboardList();
    this.showActiveAll = true;
    this.showActiveCompleted = false;
    this.showActiveUnderProcess = false;
  }

  getCompleteCases(){
    this.dashboard.getCompletedList();
    this.showActiveAll = false;
    this.showActiveCompleted = true;
    this.showActiveUnderProcess = false;
  }

  getUnderProcessCases(){
    this.dashboard.getProcessList();
    this.showActiveAll = false;
    this.showActiveCompleted = false;
    this.showActiveUnderProcess = true;
  }


  ngOnInit(){   
    this.getTabCounts();
  }

}