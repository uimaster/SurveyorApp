import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
// import 'rxjs/Rx';

import * as urls from '../../../shared/urls';

@Injectable()

export class PreCattleService {
  constructor( private http: HttpClient) {}

  GetClaimDetails(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLECLAIMGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostClaimDetails(payload: any): Observable<any> {
    return this.http.post(urls.CATTLECLAIMPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetDescription(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEDESCRIPTIONGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostDescription(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEDESCRIPTIONPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetOtherInfo(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEOTHERINFOGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostOtherInfo(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEOTHERINFOPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }


}



