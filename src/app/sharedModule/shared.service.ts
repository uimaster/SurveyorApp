import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MULTIIMAGES_URL } from '../../shared/img.urls';
import { SPOTCOMPLETIONURL, GETIMAGE_URL } from '../../shared/urls';
import * as imageModels from './shared.model';


@Injectable()
export class SharedModuleServices {
  constructor(private http: HttpClient) {}

  // GET SUMMARY KYC DOC IMAGE //
  getMultiImages(caseID): Observable<any> {
    const params = new HttpParams().set('CaseID', caseID).set('CaseImageCode', 'VHIMGS');
    return this.http.get(GETIMAGE_URL, {params})
      .map(res => {
        if (res) {
          return res;
        }
      })
      .catch(error => Observable.throw('server Error.'));
  }

  // ============ Spot wizard completion ============ //

  PostSpotCompletion(payload: any): Observable<any> {
    // var CaseID= localStorage.getItem('CaseID');
    // const params = new HttpParams().set('CaseID', CaseID).set('SurveyStatusId', '5');
    return this.http
      .post(SPOTCOMPLETIONURL, payload)
      .map((res: any) => {
        if (res) {
          return res;
        } else {
          return res;
        }
      })
      .catch(error => Observable.throw(error.json() || 'Server error'));
  }

  // GET IMAGE //
  getImages(payload: imageModels.GenericGetImageRequestModel): Observable<any> {
    const params = new HttpParams().set('CaseID', payload.CaseID).set('CaseImageCode', payload.CaseImageCode);
    return this.http.get(GETIMAGE_URL, {params})
        .map((res: imageModels.GenericGetImageResponseModel) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  preventSpecialChar(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
      key === 55 || key === 48  || key === 57 || key === 186 ));
    if (preventsKey) {
      console.log('Special Keys are not allowed');
      return false;
    }
  }
}
