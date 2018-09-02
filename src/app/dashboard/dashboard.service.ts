import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { SPOTCREATECASE, PRECREATECASE, 
    GETUSERLIST_URL, CATTLESPOTCREATECASE,
     CATTLEPRECREATECASE, GENERATESPOTREPORT, GENERATEPREREPORT} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class DashboardService {
    constructor(private http: HttpClient) {}

    // createSpotCase(payload: any): Observable<any> {
    //     return this.http.post(SPOTCREATECASE, payload)
    //         .map((res) => {
    //             if (res) {
    //                 return res;
    //             } else {
    //                 return res;
    //             }
    //         })
    //         .catch((error) => Observable.throw('server Error.'));
    // }

    // createPreCase(payload: any): Observable<any> {
    //   return this.http.post(PRECREATECASE, payload)
    //       .map((res) => {
    //           if (res) {
    //               return res;
    //           } else {
    //               return res;
    //           }
    //       })
    //       .catch((error) => Observable.throw('server Error.'));
    // }

    createCattleSpotCase(payload: any): Observable<any> {
      return this.http.post(CATTLESPOTCREATECASE, payload)
          .map((res) => {
              if (res) {
                  return res;
              } else {
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
  }

  createCattlePreCase(payload: any): Observable<any> {
    return this.http.post(CATTLEPRECREATECASE, payload)
        .map((res) => {
            if (res) {
                return res;
            } else {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

    getUserList(payload: any): Observable<any> {
      const params =  new HttpParams().set('SurveyorID', payload);
      return this.http.get(GETUSERLIST_URL, {params})
          .map((res) => {
              if (res) {
                  return res;
              } else {
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
    }

    // GET generateSpotSurvey //
    generateSpotSurvey(caseid): Observable<any> {
        const params = new HttpParams().set('CaseID', JSON.parse(caseid));
        return this.http.get(GENERATESPOTREPORT, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    // GET generate Pre Survey //
    generatePreSurvey(caseid): Observable<any> {
        const params = new HttpParams().set('CaseID', JSON.parse(caseid));
        return this.http.get(GENERATEPREREPORT, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }
}
