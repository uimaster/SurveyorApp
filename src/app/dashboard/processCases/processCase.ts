import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { TabsService } from '../dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from '../dashboardTabs/tabs.model';

@Component({
  selector: 'processCase-selector',
  templateUrl: './processCase.html',
  styleUrls: ['./processCase.scss'],
})
export class ProcessCaseComponent implements OnInit{  
  public UnderProcessCases = [];
  itemsLength:number;
  constructor( private tabsServices: TabsService, private router: Router){}

  getProcessList(){
    this.tabsServices.getProcessList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.UnderProcessCases = res.Data;
        localStorage.setItem('CaseID', this.UnderProcessCases[0].CaseID);
      }
    })
  }

  getClaimDetails(id){
    if(id === 1){
      this.router.navigate(['wizard']);
    }
    else{
      this.router.navigate(['pre-wizard']);
    }
  }

  ngOnInit(){
    this.getProcessList();
  }
}