import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import {MULTIIMAGES_URL} from '../../shared/img.urls';      
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()

export class SharedModuleServices{

    constructor( private http: HttpClient){}


// GET SUMMARY KYC DOC IMAGE //
getMultiImages():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
    return this.http.get(MULTIIMAGES_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

}