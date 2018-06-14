import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { TabsService } from '../dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from '../dashboardTabs/tabs.model';
import { WizardService } from '../../wizard/wizard.service';

@Component({
  selector: 'processCase-selector',
  templateUrl: './processCase.html',
  styleUrls: ['./processCase.scss'],
})
export class ProcessCaseComponent implements OnInit{  
  public UnderProcessCases = [];
  itemsLength:number;
  Loader: boolean = true;
  downloadUrl:string ="";
  constructor( private tabsServices: TabsService, private router: Router, private wizardService: WizardService){}

  downloadSpotSurvey(){
      var CaseID= localStorage.getItem('CaseID');
      let baseurl= 'http://apiflacors.iflotech.in/api/DownloadReport/getSpotSurveyReport?CaseID=';
      this.downloadUrl = baseurl + CaseID;
  }

  generateSpotSurvey(){
      this.wizardService.generateSpotSurvey().subscribe( res=>{
          if(res && res.Status == 200){
              alert("You have generated Spot Survey Successfully.");
          }
          else{
              alert("You have failed to generate Spot Survey.");
          }
      })
  }


  getProcessList(){
    this.tabsServices.getProcessList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.UnderProcessCases = res.Data;

      }
      this.Loader = false;
    })
  }

  getClaimDetails(id, caseid, caseNo){
     localStorage.setItem('CaseID', caseid);
     localStorage.setItem('CaseNO', caseNo);
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