import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TabsService } from './dashboardTabs/tabs.service';
import { TabsResponse, TabsGenericResponse} from './dashboardTabs/tabs.model';
import { WizardService } from '../vehicle-survey/spot-wizard/wizard.service';
import { DashboardService } from './dashboard.service';
import {CompaniesService} from '../companies/companies.service';
import { SurveyorService } from '../surveyor/surveyor.service';
import { AreaService } from '../area/area.service';
import { SharedModuleServices } from '../sharedModule/shared.service';

@Component({
  selector: 'dashboard-selector',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
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
  isDeleteModal = false;
  companyListData = [];
  surveyorList = [];
  areaList = [];
  createCaseForm: FormGroup;
  companyDisabled = false;
  surveyorDisabled = false;
  areaDisabled = false;
  showDeleteButton = false;
  comletionForm: FormGroup;
  userDisabled = true;
  userList = [];
  userId = 0;
  noUserMsg = false;
  public searchText = '';
  showError = false;
  errorMessage: string;
  showAcceptBtn = false;
  deleteCaseId = '';
  deleteCaseNo = '';
  constructor( private tabsServices: TabsService, private wizardService: WizardService, private router: Router, private fb: FormBuilder,
    private dashboardService: DashboardService, private companyService: CompaniesService, private surveyorService: SurveyorService,
    private areaService: AreaService, private sharedModuleServices: SharedModuleServices
  ) {
    this.createCase();
  }

  createCase() {
    const date = new Date();
    this.createCaseForm = this.fb.group({
      SurveyorsId: [0],
      CaseStatusID: [0],
      CompanyId: [0, Validators.required],
      CaseTypeID: [0],
      CaseID: [0],
      CaseNo: [''],
      UserID: [''],
      CaseDate: [date.toISOString()],
      PolicyNO: [''],
      ClaimNO: [''],
      AreaID: ['0']
    });
  }

  createCaseInit() {
    // debugger;
    const SurveyorsId = localStorage.getItem('SurveyorsId');
    const companyId = localStorage.getItem('CompanyId');
    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    const UserId = JSON.parse(localStorage.getItem('UserId'));
    // this.createCaseForm.controls['SurveyorsId'].setValue(0);
    this.createCaseForm.controls['CompanyId'].setValue(0);
    this.createCaseForm.controls['UserID'].setValue(0);
    this.createCaseForm.controls['AreaID'].setValue(0);
    this.createCaseForm.controls['SurveyorsId'].setValue(JSON.parse(SurveyorsId));

    if (userTypeId === 1) {
      this.companyDisabled = false;
      this.surveyorDisabled = false;
      this.userDisabled = true;
      this.showDeleteButton = true;
      this.createCaseForm.controls['SurveyorsId'].setValue(0);
      this.createCaseForm.controls['CompanyId'].setValidators(Validators.required);
      this.createCaseForm.controls['CompanyId'].updateValueAndValidity();
      this.createCaseForm.controls['SurveyorsId'].clearValidators();
      this.createCaseForm.controls['SurveyorsId'].updateValueAndValidity();
    } else if (userTypeId === 2) {
      this.companyDisabled = true;
      this.surveyorDisabled = false;
      this.userDisabled = true;
      this.showDeleteButton = false;
      this.createCaseForm.controls['SurveyorsId'].setValue(0);
      this.createCaseForm.controls['CompanyId'].setValue(JSON.parse(companyId));
      this.createCaseForm.controls['CompanyId'].clearValidators();
      this.createCaseForm.controls['CompanyId'].updateValueAndValidity();
      this.createCaseForm.controls['SurveyorsId'].clearValidators();
      this.createCaseForm.controls['SurveyorsId'].updateValueAndValidity();
    } else if (userTypeId === 3) {
      this.companyDisabled = false;
      this.surveyorDisabled = true;
      this.userDisabled = false;
      this.showDeleteButton = false;
      this.createCaseForm.controls['CompanyId'].setValidators(Validators.required);
      this.createCaseForm.controls['CompanyId'].updateValueAndValidity();
      // this.createCaseForm.controls['SurveyorsId'].setValue(SurveyorsId);
      this.createCaseForm.controls['SurveyorsId'].clearValidators();
      this.createCaseForm.controls['SurveyorsId'].updateValueAndValidity();
    } else if (userTypeId === 4) {
      this.surveyorDisabled = true;
      this.userDisabled = true;
      this.showDeleteButton = false;
      this.createCaseForm.controls['CompanyId'].setValidators(Validators.required);
      this.createCaseForm.controls['CompanyId'].updateValueAndValidity();
      this.createCaseForm.controls['SurveyorsId'].clearValidators();
      this.createCaseForm.controls['SurveyorsId'].updateValueAndValidity();
      this.createCaseForm.controls['UserID'].setValue(UserId);
      // setTimeout(() => {
      //   this.createCaseForm.controls['UserID'].disable();
      //   this.userDisabled = true;
      // }, 3000);
    }
  }

  getDashboardList() {
    this.Loader = true;
    this.tabsServices.getDashboardList(this.userId)
    .subscribe(res => {
      if (res && res.Status === '200') {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.Loader = false;
          this.noData = false;
          this.showProcessButtton = false;
          this.completedCasebuttons = true;
          this.showDeleteButton = true;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
    this.showAcceptBtn = false;
  }

  getCompletedList() {
    this.tabsServices.getCompletedList(this.userId)
    .subscribe(res => {
      if (res && res.Status === '200') {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.Loader = false;
          this.showProcessButtton = false;
          this.noData = false;
          this.completedCasebuttons = true;
          this.showDeleteButton = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
    this.showAcceptBtn = false;
  }


  getBroadcastList() {
    this.tabsServices.getBroadCastList(this.userId)
    .subscribe(res => {
      if(res && res.Status === '200') {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.Loader = false;
          this.showProcessButtton = false;
          this.noData = false;
          this.completedCasebuttons = false;
          this.showDeleteButton = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
    this.showAcceptBtn = true;
  }

  getProcessList() {
    this.tabsServices.getProcessList(this.userId)
    .subscribe(res => {
      if (res && res.Status === '200') {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.showProcessButtton = true;
          this.completedCasebuttons = false;
          this.showDeleteButton = false;
          this.Loader = false;
          this.noData = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
    this.showAcceptBtn = false;
  }

  getAllocatedList() {
    this.tabsServices.getAllocatedList(this.userId)
    .subscribe(res => {
      if (res && res.Status === '200') {
        this.TotalDada = res.Data;
        if (this.TotalDada.length > 0) {
          this.showProcessButtton = true;
          this.completedCasebuttons = false;
          this.showDeleteButton = false;
          this.Loader = false;
          this.noData = false;
        } else {
          this.noData = true;
          this.Loader = false;
        }
      }
    });
    this.showAcceptBtn = false;
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

    this.createCaseForm.controls['UserID'].setValue('');
    this.dashboardService.getUserList(data)
      .subscribe(res => {
        this.userList = [];
        if (res.Data.length > 0 ) {
          this.userList = res.Data;
          this.noUserMsg = false;
          this.userDisabled = false;
        } else {
          this.noUserMsg = true;
          this.userDisabled = true;
        }
    });
  }

  getSurveyorsUser(event) {
    this.getUserList(event.value);
  }

  openCreateCase() {
    this.openCreateCaseModal = true;
    this.createCaseInit();
  }

  openDeleteModal(caseid, caseNo) {
    this.isDeleteModal = true;
    this.deleteCaseId = caseid;
    this.deleteCaseNo = caseNo;
    console.log(this.deleteCaseId, this.deleteCaseNo);
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  closeCreateCase() {
    this.openCreateCaseModal = false;
    this.createCaseForm.controls['SurveyorsId'].setValue(0);
    this.createCaseForm.controls['CompanyId'].setValue(0);
    this.createCaseForm.controls['UserID'].setValue(0);
    this.createCaseForm.controls['AreaID'].setValue(0);
  }

  createSpotCase(data, casetypeid) {
    data.CaseTypeID = casetypeid;
    if (this.createCaseForm.valid) {
      this.dashboardService.createCattleSpotCase(data)
      .subscribe(res => {
        if (res && res.Status === '200') {
          let Data = res.Data[0];
          this.showError = false;
          this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
        } else {
          this.errorMessage = res.Message;
          this.showError = true;
        }
      });
    } else {
      console.log('invalid form');
    }
  }

  createPreCase(data, casetypeid) {
    data.CaseTypeID = casetypeid;
    if (this.createCaseForm.valid) {
      this.dashboardService.createCattlePreCase(data)
      .subscribe(res => {
        if (res && res.Status === '200') {
          let Data = res.Data[0];
          this.showError = false;
          this.getClaimDetails(Data.CaseTypeID, Data.CaseID, Data.CaseNo, 'false');
        } else {
          this.errorMessage = res.Message;
          this.showError = true;
        }
      });
    } else {
      console.log('invalid form');
    }
  }




  getClaimDetails(CaseTypeId, caseid, caseNo, completed) {
    localStorage.setItem('CaseID', caseid);
    localStorage.setItem('CaseNO', caseNo);
    localStorage.setItem('IsCompleted', completed);
    if (CaseTypeId === 1) {
      this.router.navigate(['wizard']);
    } else if (CaseTypeId === 2) {
      this.router.navigate(['pre-wizard']);
    } else if (CaseTypeId === 3) {
      this.router.navigate(['spot-cattle']);
    } else if (CaseTypeId === 4) {
      this.router.navigate(['pre-cattle']);
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
          alert('You have' + res.Message + 'fully changed the case status.');
          this.getDashboardList();
      } else {
        alert(res.Message);
      }
    });
  }

  ngOnInit() {
    const userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
    if (userTypeId === 1) {
      this.userId = 0;
    } else if (userTypeId === 2) {
      this.userId = 0;
    } else if (userTypeId === 3) {
      this.userId = 0;

      setTimeout(() => {
        const serveyorId = localStorage.getItem('SurveyorsId');
        this.getUserList(serveyorId);
      }, 1300);

    } else if (userTypeId === 4) {
      this.userId = JSON.parse(localStorage.getItem('UserId'));
      setTimeout(() => {
        const serveyorId = localStorage.getItem('SurveyorsId');
        this.getUserList(serveyorId);
      }, 1300);
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



    // setTimeout(() => {
    //   this.createCaseInit();
    // }, 1700);



    this.showDownload = JSON.parse(localStorage.getItem('showDownload'));
    if ( this.showDownload === null || this.showDownload === undefined) {
      localStorage.setItem('showTittle', 'true');
    }
    this.showTittle = JSON.parse(localStorage.getItem('showTittle'));
  }

  generateSpotSurvey(caseid) {
    localStorage.setItem('SpotCaseId', JSON.parse(caseid));
    this.dashboardService.generateSpotSurvey(caseid).subscribe( res => {
        if ( res && res.Status == 200) {
            alert('You have generated Spot Survey Successfully.');
        } else {
            alert('You have failed to generate Spot Survey.');
        }
    });
  }

  generatePreSurvey(caseid) {
    localStorage.setItem('PreCaseId', JSON.parse(caseid));
    this.dashboardService.generatePreSurvey(caseid).subscribe( res => {
        if ( res && res.Status == 200) {
            alert('You have generated Pre Survey Successfully.');
        } else {
            alert('You have failed to generate Pre Survey.');
        }
    });
  }

  // downloadSpotSurvey(caseid) {
  //   const baseurl = 'http://apiflacorev2.iflotech.in/api/Reports/DownloadSPReportPDF?CaseID=';
  //   this.downloadUrl = baseurl + caseid;
  // }

  downloadSpotSurvey(caseId, caseTypeId) {
    const baseurl = 'http://apiflacorev2.iflotech.in/api/ReportDownload/DownloadSPReportPDF?CaseID=';
    this.downloadUrl = baseurl + caseId + '&CaseTypeId=' + caseTypeId;

    console.log(baseurl);
  }

  deleteCase(caseid) {
    this.dashboardService.deleteCase(caseid).subscribe( res => {
      if (res && res.Status === '200') {
        alert('You have successfully delete the case.');
        this.isDeleteModal = false;
        window.location.reload();
      } else {
        alert('Delete operatio failed');
      }
    });
  }
}
