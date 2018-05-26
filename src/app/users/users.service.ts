import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {USERSLIST} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()

export class UsersService {
  SurveyorsId: any;
  companyId: any;

  constructor(private http: HttpClient){}

  getUsersList(): Observable<any> {
    return this.http.get(USERSLIST)
      .map((res) => {
        if(res){
          return res;
        }
      })
      .catch((error) => Observable.throw('server Error.'));
  }

  // getTabCounts():Observable<any>{
  //
  //   this.SurveyorsId = localStorage.getItem('SurveyorsId');
  //   this.companyId = localStorage.getItem('CompanyId');
  //   const params = new HttpParams().set('SurveyorsID', JSON.parse(this.SurveyorsId)).set('CompanyID',JSON.parse(this.companyId));
  //   return this.http.get(DASHBOARDTABCOUNTS, {params})
  //     .map((res) =>{
  //       if(res){
  //         return res;
  //       }
  //     })
  //     .catch((error) => Observable.throw('server Error.'));
  // }
  //
  //
  // getProcessList():Observable<any>{
  //   this.SurveyorsId = localStorage.getItem('SurveyorsId');
  //   const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID','3');
  //   return this.http.get(DASHBOARD_CAT_CASES, {params})
  //     .map((res) =>{
  //       if(res){
  //         return res;
  //       }
  //     })
  //     .catch((error) => Observable.throw('server Error.'));
  // }

}
