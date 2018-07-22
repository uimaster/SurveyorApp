import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {COMPANYLIST, CREATECOMPANY, UPDATE_CRAETE_COMPANY_URL} from '../../shared/urls';
import 'rxjs/Rx';
@Injectable()

export class CompaniesService {
  constructor(private http: HttpClient) {}
/*get company list*/

  getCompanyList(): Observable<any> {
    return this.http.get(COMPANYLIST)
      .map((res) => {
        if(res){
          return res;
        }
      })
      .catch((error) => Observable.throw('server Error.'));
  }

  addCompanies(payload: any): Observable<any> {
    return this.http.post(UPDATE_CRAETE_COMPANY_URL, payload)
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
