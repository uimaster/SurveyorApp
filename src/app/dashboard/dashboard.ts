import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';
import { WizardService } from '../wizard/wizard.service';
import { DashboardService } from './dashboard.service';
import {CompaniesService} from '../companies/companies.service';
import { SurveyorService } from '../surveyor/surveyor.service';
import { AreaService } from '../area/area.service';

@Component({
  selector: 'dashboard-selector',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit{

  public TotalDada = [];
  itemsLength: number;
  showTittle: boolean;
  showDownload: boolean;
  downloadUrl: string;
  Loader = true;
  noData = false;
  showProcessButtton = false;
  showActionColumn = false;
  completedCasebuttons = false;
  openCreateCaseModal = false;
  companyListData = [];
  surveyorList = [];
  areaList = [];
  createCaseForm: FormGroup;
  companyDisabled = false;
  surveyorDisabled = false;
  areaDisabled = false;
  hideAllCreateControls = false;

  constructor( private tabsServices: TabsService, private wizardService: WizardService, private router: Router, private fb: FormBuilder,
    private dashboardService: DashboardService, private companyService: CompaniesService, private surveyorService: SurveyorService,
    private areaService: AreaService
  ) {
    this.createCase();
  }

  createCase() {
    const date = new Date();
    this.createCaseForm = this.fb.group({
      SurveyorsId: ['', Validators.required],
      CaseStatusID: ['0'],
      CompanyId: [''],
      CaseID: ['0'],
      CaseNo: [''],
      CaseDate: [date.toISOString()],
      PolicyNO: [''],
      ClaimNO: [''],
      AreaID: ['0']
    });
  }

  createCaseInit() {
    const SurveyorsId = localStorage.getItem('SurveyorsId');
    const companyId = localStorage.getItem('CompanyId');
    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    this.createCaseForm.controls['SurveyorsId'].setValue(JSON.parse(SurveyorsId));
    this.createCaseForm.controls['CompanyId'].setValue(JSON.parse(companyId));

    if (userTypeId === 1) {
      this.areaDisabled = false;
      this.companyDisabled = false;
      this.surveyorDisabled = false;
      this.hideAllCreateControls = false;
    } else if (userTypeId === 2) {
      this.areaDisabled = false;
      this.companyDisabled = true;
      this.surveyorDisabled = false;
      this.hideAllCreateControls = false;
    } else if (userTypeId === 3) {
      this.areaDisabled = true;
      this.companyDisabled = true;
      this.surveyorDisabled = true;
      this.hideAllCreateControls = true;
    }
  }

  getDashboardList() {
    this.tabsServices.getDashboardList()
    .subscribe(res => {
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0) {
          this.Loader = false;
          this.noData = false;
          this.showProcessButtton = false;
          this.completedCasebuttons = false;
          this.showActionColumn = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
  }

  getSurveyorList() {
    this.surveyorService.getSurveyorList()
    .subscribe(res => {
      this.surveyorList = res.Data;
    });
  }

  getCompanyList() {
    this.companyService.getCompanyList()
        .subscribe(res => {
        this.companyListData = res.Data;
    });
  }

  getAreaList() {
    this.areaService.getAreaList()
      .subscribe(res => {
        this.areaList = res.Data;
    });
  }

  openCreateCase() {
    this.openCreateCaseModal = true;
  }

  closeCreateCase() {
    this.openCreateCaseModal = false;
  }

  createSpotCase(data) {
    console.log(data);
    this.dashboardService.createSpotCase(data)
    .subscribe(res =>{
      if(res && res.Status === '200'){
        let Data = res.Data[0];
        this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
      }
    });
  }

  createPreCase(data) {
    console.log(data);
    this.dashboardService.createPreCase(data)
    .subscribe(res => {
      if (res && res.Status === '200'){
        let Data = res.Data[0];
        this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
      }
    });
  }

  getCompletedList() {
    this.tabsServices.getCompletedList()
    .subscribe(res =>{
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0) {
          this.Loader = false;
          this.showProcessButtton = false;
          this.showActionColumn = true;
          this.noData = false;
          this.completedCasebuttons = true;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
  }

  getProcessList() {
    this.tabsServices.getProcessList()
    .subscribe(res => {
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.showProcessButtton = true;
          this.showActionColumn = true;
          this.completedCasebuttons = false;
          this.Loader = false;
          this.noData = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
  }


  getClaimDetails(id, caseid, caseNo, completed) {
    localStorage.setItem('CaseID', caseid);
    localStorage.setItem('CaseNO', caseNo);
    localStorage.setItem('IsCompleted', completed);
    if (id === 1) {
      this.router.navigate(['wizard']);
    } else {
      this.router.navigate(['pre-wizard']);
    }
  }


  ngOnInit() {
    setTimeout(() => {
      this.getDashboardList();
    }, 100);

    setTimeout(() => {
      this.getSurveyorList();
    }, 400);

    setTimeout(() => {
      this.getCompanyList();
    }, 700);

    setTimeout(() => {
      this.getAreaList();
    }, 1000);

    setTimeout(() => {
      this.createCaseInit();
    }, 1200);



    this.showDownload = JSON.parse(localStorage.getItem('showDownload'));
    if(this.showDownload === null || this.showDownload === undefined){
      localStorage.setItem('showTittle', 'true');
    }
    this.showTittle = JSON.parse(localStorage.getItem('showTittle'));
  }

  generateSpotSurvey(caseid) {
    localStorage.setItem('SpotCaseId', JSON.parse(caseid));
    this.wizardService.generateSpotSurvey(caseid).subscribe( res => {
        if ( res && res.Status == 200) {
            alert('You have generated Spot Survey Successfully.');
        } else {
            alert('You have failed to generate Spot Survey.');
        }
    });
  }

  generatePreSurvey(caseid) {
    localStorage.setItem('PreCaseId', JSON.parse(caseid));
    this.wizardService.generatePreSurvey(caseid).subscribe( res => {
        if ( res && res.Status == 200) {
            alert('You have generated Pre Survey Successfully.');
        } else {
            alert('You have failed to generate Pre Survey.');
        }
    });
  }

  downloadSpotSurvey(caseid) {
    const baseurl = 'http://apiflacors.iflotech.in/api/DownloadReport/getSpotSurveyReport?CaseID=';
    this.downloadUrl = baseurl + caseid;
  }
}
