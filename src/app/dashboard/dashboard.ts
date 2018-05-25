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

  getDashboardList(){
    this.tabsServices.getDashboardList()
    .subscribe(res =>{
      console.log(res);
      if(res.Status = 200){
        this.TotalDada = res.Data;
        console.log('dashboardList:', this.TotalDada);
      }
    })
  }
  

  ngOnInit(){
    this.getDashboardList();
  }
}