import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AREALIST, USERSLIST} from "../../shared/urls";
import 'rxjs/Rx';
@Injectable()

export class AreaService {
  constructor(private http: HttpClient){}

  getAreaList(): Observable<any> {
    return this.http.get(AREALIST)
      .map((res) => {
        if(res){
          return res;
        }
      })
      .catch((error) => Observable.throw('server Error.'));
  }

  addArea(payload: any): Observable<any> {
    return this.http.post(AREALIST, payload)
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
