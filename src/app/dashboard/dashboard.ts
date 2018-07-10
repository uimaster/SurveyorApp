import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';
import { WizardService } from '../wizard/wizard.service';
import { DashboardService } from './dashboard.service';
import {CompaniesService} from '../companies/companies.service';
import { SurveyorService } from '../surveyor/surveyor.service';
import { AreaService } from '../area/area.service';
import { SharedModuleServices } from '../sharedModule/shared.service';

@Component({
  selector: 'dashboard-selector',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
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
  comletionForm: FormGroup;
  createCaseDisabled: boolean;
  userList = [];
  userId = 0;

  constructor( private tabsServices: TabsService, private wizardService: WizardService, private router: Router, private fb: FormBuilder,
    private dashboardService: DashboardService, private companyService: CompaniesService, private surveyorService: SurveyorService,
    private areaService: AreaService, private sharedModuleServices: SharedModuleServices
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
      UserID: ['', Validators.required],
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
      this.createCaseDisabled = false;
    } else if (userTypeId === 2) {
      this.areaDisabled = false;
      this.companyDisabled = true;
      this.surveyorDisabled = false;
      this.hideAllCreateControls = false;
      this.createCaseDisabled = false;
    } else if (userTypeId === 3) {
      this.areaDisabled = true;
      this.companyDisabled = true;
      this.surveyorDisabled = true;
      this.hideAllCreateControls = true;
      this.createCaseDisabled = false;
    } else if (userTypeId === 4) {
      this.createCaseDisabled = true;
    }
  }

  getDashboardList() {
    this.Loader = true;
    this.tabsServices.getDashboardList(this.userId)
    .subscribe(res => {
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0) {
          this.Loader = false;
          this.noData = false;
          this.showProcessButtton = false;
          this.completedCasebuttons = true;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
  }

  getCompletedList() {
    this.tabsServices.getCompletedList(this.userId)
    .subscribe(res =>{
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if(this.TotalDada.length > 0) {
          this.Loader = false;
          this.showProcessButtton = false;
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
    this.tabsServices.getProcessList(this.userId)
    .subscribe(res => {
      if(res && res.Status == 200) {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.showProcessButtton = true;
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

  getUserList(data) {
    this.dashboardService.getUserList(data)
        .subscribe(res => {
          this.userList = [];
          if (res.Data.length > 0 ) {
            this.userList = res.Data;
            this.createCaseForm.controls['UserID'].setValue(this.userList[0].UserID);
          }
    });
  }

  getSurveyorsUser(event) {
    this.getUserList(event.value);
  }

  openCreateCase() {
    this.openCreateCaseModal = true;
  }

  closeCreateCase() {
    this.openCreateCaseModal = false;
  }

  createSpotCase(data) {
    this.dashboardService.createSpotCase(data)
    .subscribe(res =>{
      if(res && res.Status === '200') {
        let Data = res.Data[0];
        this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
      }
    });
  }

  createPreCase(data) {
    this.dashboardService.createPreCase(data)
    .subscribe(res => {
      if (res && res.Status === '200') {
        let Data = res.Data[0];
        this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
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

  PostSpotCompletion(sur: any, caseId: number) {
    const CaseID = JSON.stringify(caseId);
    // const surveyorId = JSON.stringify(sur);
    this.comletionForm = this.fb.group({
        CaseID: new FormControl(CaseID),
        SurveyStatusId: new FormControl(sur)
    });
    this.sharedModuleServices.PostSpotCompletion(this.comletionForm.value).subscribe(res => {
      if (res) {
          alert('You have' + res.Message+'fully converted completed to UnderProcess case.');
          this.getDashboardList();
      } else {
        alert(res.Message);
      }
    });
  }
  
  ngOnInit() {
    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    if (userTypeId === 1) {
      this.createCaseDisabled = false;
      this.userId = 0;
    } else if (userTypeId === 2) {
      this.createCaseDisabled = false;
      this.userId = 0;
    } else if (userTypeId === 3) {
      this.createCaseDisabled = false;
      this.userId = 0;
    } else if (userTypeId === 4) {
      this.createCaseDisabled = true;
      this.userId = JSON.parse(localStorage.getItem('UserId'));
    }

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

    setTimeout(() => {
      const serveyorId = localStorage.getItem('SurveyorsId');
      this.getUserList(serveyorId);
    }, 2000);


    this.showDownload = JSON.parse(localStorage.getItem('showDownload'));
    if ( this.showDownload === null || this.showDownload === undefined) {
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
