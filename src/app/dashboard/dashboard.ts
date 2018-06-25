import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';
import { WizardService } from '../wizard/wizard.service';

@Component({
  selector: 'dashboard-selector',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit{

  public TotalDada = [];
  itemsLength:number;
  showTittle:boolean;
  showDownload:boolean;
  downloadUrl:string ="";
  Loader: boolean = true;
  noData: boolean = false;
  showProcessButtton: boolean = false;
  
  
  constructor( private tabsServices: TabsService, private wizardService: WizardService, private router: Router){}

  getDashboardList(){
    this.tabsServices.getDashboardList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.TotalDada = res.Data;        
        if(this.TotalDada.length > 0){          
          this.Loader = false;
          this.noData = false; 
          this.showProcessButtton = false;         
        }
        else{
          this.noData = true;
          this.Loader = false;
        }
      }
    })
  }

  getCompletedList(){
    this.tabsServices.getCompletedList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0){          
          this.Loader = false;
          this.showProcessButtton = false;
          this.noData = false;
        }
        else{
          this.noData = true;
          this.Loader = false;
        }
      }
    })
  }

  getProcessList(){
    this.tabsServices.getProcessList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0){
          this.showProcessButtton = true;          
          this.Loader = false;
          this.noData = false;
        }
        else{
          this.noData = true;
          this.Loader = false;
        }
      }
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
    setTimeout(() => {
      this.getDashboardList();
    }, 100);
    this.showDownload = JSON.parse(localStorage.getItem('showDownload'));
    if(this.showDownload === null || this.showDownload === undefined){
      localStorage.setItem('showTittle', 'true');
    }
    this.showTittle = JSON.parse(localStorage.getItem('showTittle'));
    this.downloadSpotSurvey();
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

  downloadSpotSurvey(){
    var CaseID= localStorage.getItem('CaseID');
    let baseurl= 'http://apiflacors.iflotech.in/api/DownloadReport/getSpotSurveyReport?CaseID=';
    this.downloadUrl = baseurl + CaseID;
  }
}
