import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LoginRequest, LoginResponse} from './login.model';
import { LOGINURL, REFRESHTOKEN_URL } from '../../shared/urls';
import {InterceptorSkipHeader} from './login.inteceptor';

import {LocalStorage} from '../../shared/localStorage';


@Injectable()

export class LoginService {
  public authTokenStale = 'stale_auth_token';
  public authTokenNew = 'new_auth_token';
  public currentToken: string;
  constructor(private http: HttpClient) {
    this.currentToken = this.authTokenStale;
  }

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


  refreshToken(): Observable<LoginResponse> {

    const payload = JSON.stringify({
      'deviceType': '1',
      'token': `${LocalStorage.getRefreshToken()}`
    });
    return this.http.post(REFRESHTOKEN_URL, payload)
      .map((res: LoginResponse) => {
        console.log('refreshToken:', res);
        return res;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  logoutOnError(): Observable<any> {
    localStorage.clear();
    return <any> false;
  }

}
