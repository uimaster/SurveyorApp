import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
// import 'rxjs/Rx';

import * as urls from '../../../shared/urls';

@Injectable()

export class SpotCattleService {
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

  GetInspection(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEINSPECTIONGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostInspection(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEINSPECTIONPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetProofDetails(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEPROOFGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostProofDetails(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEPROOFPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetEnquiryoneDetails(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEENQUIRYONEGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostEnquiryoneDetails(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEENQUIRYONEPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetEnquirytwoDetails(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEENQUIRYTWOGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  PostEnquirytwoDetails(payload: any): Observable<any> {
    return this.http.post(urls.CATTLEENQUIRYTWOPOST_URL, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        } else {
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

  GetSummaryDetails(): Observable<any> {
    const CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', CaseID);
    return this.http.get(urls.CATTLEREPORTSUMMARYGET_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

}



