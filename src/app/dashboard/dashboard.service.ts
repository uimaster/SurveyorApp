import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { SPOTCREATECASE, PRECREATECASE, GETUSERLIST_URL} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class DashboardService {
    constructor(private http: HttpClient) {}

    createSpotCase(payload: any): Observable<any> {
        return this.http.post(SPOTCREATECASE, payload)
            .map((res) => {
                if (res) {
                    return res;
                } else {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    createPreCase(payload: any): Observable<any> {
      return this.http.post(PRECREATECASE, payload)
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
}
