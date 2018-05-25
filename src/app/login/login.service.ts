import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { LoginRequest, LoginResponse} from './login.model';
import { LOGINURL } from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class LoginService{
    
    constructor(private http: HttpClient){}

    loginSubmit(payload: LoginRequest):Observable<LoginResponse>{
        const params = new HttpParams().set('username', payload.username).set('password', payload.password);
        return this.http.get(LOGINURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

}