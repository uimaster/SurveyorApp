import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import {USERSLIST, WIZARD_POSTCLAIMURL} from '../../shared/urls';
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

  addUser(payload: any): Observable<any> {
    return this.http.post(USERSLIST, payload)
      .map((res: any) =>  {
        if (res) {
          return res;
        }
        else{
          return res;
        }

      })
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }


}
