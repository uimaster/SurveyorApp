import {Component, OnInit} from '@angular/core';

import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';

@Component({
  selector: 'dashboard-selector',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit{
 
  public TotalDada = [];
  itemsLength:number;
  constructor( private tabsServices: TabsService){}

  getTabsDetails(){
    this.tabsServices.getTabsDetails()
    .subscribe(res =>{
      console.log(res);
      if(res.status = 200){
        this.TotalDada = res.SurveyCases11;
        this.itemsLength = Object.keys(this.TotalDada).length;
      }
    })
  }
  

  ngOnInit(){
    this.getTabsDetails();
  }
}