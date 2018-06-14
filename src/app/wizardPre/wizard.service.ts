import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { LoginRequest, LoginResponse} from '../login/login.model';
import * as urls from '../../shared/urls';
import * as IMAGEURL from '../../shared/img.urls';        
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class PreWizardService{
    
    constructor(private http: HttpClient){}

    // ============ CASE Details ============ // 

    pre_GetCaseDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', CaseID);
        return this.http.get(urls.WIZARD_CASEDETAILS_URL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_PostCaseDetails(payload: any): Observable<any> {
        return this.http.post(urls.WIZARD_CASEDETAILS_URL, payload)        
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

    
    // ============ Vehicle Details ============ // 

    pre_GetInsuranceDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_INSURANCEURL_PRE, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_PostInsuranceDetails(payload: any): Observable<any> { 
        return this.http.post(urls.WIZARD_INSURANCEURL_PRE, payload)        
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

    // ============ Insurance Details ============ // 

    pre_GetVehicleDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_VEHICLEDETAILSURL_PRE, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_PostVehicleDetails(payload: any): Observable<any> { 
        return this.http.post(urls.WIZARD_VEHICLEDETAILSURL_PRE, payload)        
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

    // ============ PreInspection Conclusion ============ // 

    pre_GetConclusion():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_CONCLUSIONURL_PRE, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_PostConclusion(payload: any): Observable<any> { 
        return this.http.post(urls.WIZARD_CONCLUSIONURL_PRE, payload)        
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

    // ============ Damage Details ============ // 

    pre_GetDamageDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_DAMAGEDETAILSURL_PRE, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_GetDamagePartList():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_DAMAGEPARTSLIST_PRE, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    pre_PostDamageDetails(payload: any): Observable<any> { 
        return this.http.post(urls.WIZARD_DAMAGEDETAILSURL_PRE, payload)        
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
 
  // GET DIGITAL SIGNATURE IMAGE //
  pre_GetSignatureImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.SIGNATURE_URL_PRE, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET generateSpotSurvey //
  pre_GenerateSpotSurvey():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
    return this.http.get(urls.GENERATESPOTREPORT_PRE, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

 

}