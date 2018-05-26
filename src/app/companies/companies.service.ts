import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {COMPANYLIST} from "../../shared/urls";
import 'rxjs/Rx';
@Injectable()

export class CompaniesService {
  constructor(private http: HttpClient){}

  getCompanyList(): Observable<any> {
    return this.http.get(COMPANYLIST)
      .map((res) => {
        if(res){
          return res;
        }
      })
      .catch((error) => Observable.throw('server Error.'));
  }
}
