import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { SPOTCREATECASE, PRECREATECASE} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class DashboardService{
    constructor(private http: HttpClient){}

    createSpotCase():Observable<any>{
        let SurveyorsId = localStorage.getItem('SurveyorsId');
        // let companyId = localStorage.getItem('CompanyId');
        let date = new Date();
        const params = new HttpParams().set('SurveyorsId', SurveyorsId).set('CaseStatusID', '0')
        .set('CompanyId', '1').set('CaseID', '0').set('CaseNo', '').set('CaseDate', date.toISOString())
        .set('PolicyNO', '').set('ClaimNO', '').set('AreaID', '0');
        return this.http.post(SPOTCREATECASE, {params})
            .map((res) =>{
                if (res) {
                    return res;
                }
                else{
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    createPreCase():Observable<any>{
      let SurveyorsId = localStorage.getItem('SurveyorsId');
      // let companyId = localStorage.getItem('CompanyId');
      let date = new Date();
      const params = new HttpParams().set('SurveyorsId', SurveyorsId).set('CaseStatusID', '0')
      .set('CompanyId', '1').set('CaseID', '0').set('CaseNo', '').set('CaseDate', date.toISOString()).set('PolicyNO', '')
      .set('ClaimNO', '').set('AreaID', '0');
      return this.http.post(PRECREATECASE, {params})
          .map((res) => {
              if (res) {
                  return res;
              }
              else{
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
    }
}
