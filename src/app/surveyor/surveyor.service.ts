import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {SURVEYORLIST, USERSLIST, UPDATE_CRAETE_SURVEYOR_URL} from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()

export class SurveyorService {

  constructor(private http: HttpClient) {}

  getSurveyorList(): Observable<any> {
    return this.http.get(SURVEYORLIST)
      .map((res) => {
        if (res) {
          return res;
        }
      })
      .catch((error) => Observable.throw('server Error.'));
  }

  addSurveyor(payload: any): Observable<any> {
    return this.http.post(UPDATE_CRAETE_SURVEYOR_URL, payload)
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
