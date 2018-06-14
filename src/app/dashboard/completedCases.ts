import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';
import { WizardService } from '../wizard/wizard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './completedCases.html',
  styleUrls: ['./completedCases.css']
})

export class CompletedCaseComponent implements OnInit{  
  public completedCaseData = [];
  itemsLength:number;
  Loader: boolean = true;
  downloadUrl:string ="";

  constructor( private tabsServices: TabsService, private router: Router, private wizardService: WizardService){}

  getCompletedList(){
    this.tabsServices.getCompletedList()
    .subscribe(res =>{
      if(res && res.Status == 200){
        this.completedCaseData = res.Data;
        // localStorage.setItem('CaseID', this.completedCaseData[0].CaseID);
      }
      this.Loader = false;
    })
  }

  ngOnInit(){
    this.getCompletedList();
    this.downloadSpotSurvey();
  }

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
}