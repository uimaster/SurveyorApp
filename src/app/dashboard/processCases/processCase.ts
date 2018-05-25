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
        console.log('process:', this.UnderProcessCases);
      }
    })
  }

  getClaimDetails(id){
    localStorage.setItem('CaseID', JSON.stringify(id));
    this.router.navigate(['wizard']);
  }

  ngOnInit(){
    this.getProcessList();
  }
}