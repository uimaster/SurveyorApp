import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LoginRequest, LoginResponse} from './login.model';
import { LOGINURL } from '../../shared/urls';
import {InterceptorSkipHeader} from './login.inteceptor';


@Injectable()

export class LoginService {

    constructor(private http: HttpClient) {}

    loginSubmit({ UserName, UserPassword, DeviceType }): Observable<LoginResponse> {
      let headers = new HttpHeaders();
      // const payload = JSON.stringify({UserName: UserName, UserPassword: UserPassword});
      headers = headers.append('Authorization', 'Basic ' + btoa(UserName + ':' + UserPassword));
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers = headers.append('DeviceType', '1');
      headers = headers.append(InterceptorSkipHeader, '');

      return this.http.post(LOGINURL, {UserName, UserPassword}, {headers: headers})
          .map((res) => {
              if (res) {
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
    }

    // logIn(username: string, password: string): Observable<any> {
    //   let headers = new HttpHeaders();
    //   headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    //   headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   headers = headers.append(InterceptorSkipHeader, '');
    //   const url = `${this.BASE_URL}/jwtauth/Token`;
    //   return this.http.post<User>(url, {username, password}, {headers: headers});
    // }

    getToken(): string {
      return localStorage.getItem('token');
    }

}
