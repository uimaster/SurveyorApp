import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { TabsService } from './tabs.service';
import { TabsResponse, TabsGenericResponse} from './tabs.model';

@Component({
  selector: 'tabs-selector',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
})
export class DashboardTabComponent implements OnInit {
  public TotalCases = [];
  public AllocatedCases = [];
  public CompletedCases = [];
  public UnderProcessCases = [];
  public TotalDada = {};
  public CompletedList = {};
  public ProcessList = {};
  itemsLength:number;
  completedListLength:number;
  processListLength:number;
  constructor( private tabsServices: TabsService){}

  getTabsDetails(){
    this.tabsServices.getTabsDetails()
    .subscribe((res) =>{
      console.log('All Data:'+res);
      if(res.status = 200){
        this.TotalDada = res.SurveyCases11;
        this.itemsLength = Object.keys(this.TotalDada).length;
      }
    })
  }

  getCompletedList(){
    this.tabsServices.getCompletedList()
    .subscribe((res) =>{
      console.log('CompletedList:'+res);
      if(res.status = 200){
        this.CompletedList = res.SurveyCases11;
        this.completedListLength = Object.keys(this.CompletedList).length;
      }
    })
  }

  getProcessList(){
    this.tabsServices.getProcessList()
    .subscribe((res) =>{
      console.log('CompletedList:'+res);
      if(res.status = 200){
        this.ProcessList = res.SurveyCases11;
        this.processListLength = Object.keys(this.ProcessList).length;
      }
    })
  }

  ngOnInit(){    
    this.getCompletedList();
    setTimeout(() => {
      this.getTabsDetails();
      this.getProcessList()
    }, 2000);
  }

}