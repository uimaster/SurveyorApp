import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { LoginRequest, LoginResponse} from '../login/login.model';
import { 
        WIZARD_GETCLAIMURL, WIZARD_POSTCLAIMURL, WIZARD_POSTSURVEYORURL, WIZARD_GETVEHICLEDETAILSURL, WIZARD_POSTVEHICLEDETAILSURL,
        WIZARD_GETDRIVERDETAILSURL, WIZARD_POSTDRIVERDETAILSURL, WIZARD_GETACCIDENTDETAILSURL, WIZARD_POSTACCIDENTDETAILSURL
        } from '../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class WizardService{
    
    constructor(private http: HttpClient){}

    // ============ Claim Details ============ // 

    getClaimDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', CaseID);
        return this.http.get(WIZARD_GETCLAIMURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    postClaimDetails(payload: any): Observable<any> {
        return this.http.post(WIZARD_POSTCLAIMURL, payload)        
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

    // ============ Surveyor Details ============ // 

    postSurveyorDetails(payload: any): Observable<any> { 
        return this.http.post(WIZARD_POSTSURVEYORURL, payload)        
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

    getVehicleDetails():Observable<any>{
        var SurveyorsId= localStorage.getItem('SurveyorsId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(SurveyorsId));
        return this.http.get(WIZARD_GETVEHICLEDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    postVehicleDetails(payload: any): Observable<any> { 
        return this.http.post(WIZARD_POSTVEHICLEDETAILSURL, payload)        
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

    // ============ Driver Details ============ // 

    getDriverDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(WIZARD_GETDRIVERDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    

    postDriverDetails(payload: any): Observable<any> { 
        return this.http.post(WIZARD_POSTDRIVERDETAILSURL, payload)        
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

    // ============ Driver Details ============ // 

    geAccidentDetails():Observable<any>{
        var SurveyorsId= localStorage.getItem('SurveyorsId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(SurveyorsId));
        return this.http.get(WIZARD_GETACCIDENTDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    

    postAccidentDetails(payload: any): Observable<any> { 
        return this.http.post(WIZARD_POSTACCIDENTDETAILSURL, payload)        
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