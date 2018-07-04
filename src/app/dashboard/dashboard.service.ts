import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { SPOTCREATECASE, PRECREATECASE} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class DashboardService{
    constructor(private http: HttpClient){}

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
}
