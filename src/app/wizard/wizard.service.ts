import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { LoginRequest, LoginResponse} from '../login/login.model';
import { 
        WIZARD_GETCLAIMURL, WIZARD_POSTCLAIMURL, WIZARD_POSTSURVEYORURL, WIZARD_GETVEHICLEDETAILSURL, WIZARD_POSTVEHICLEDETAILSURL,
        WIZARD_GETDRIVERDETAILSURL, WIZARD_POSTDRIVERDETAILSURL, WIZARD_GETACCIDENTDETAILSURL, WIZARD_POSTACCIDENTDETAILSURL,
        WIZARD_GETFIRDETAILS, WIZARD_POSTFIRDETAILS, GETSUMMARYREPORT_URL
        } from '../../shared/urls';
import * as IMAGEURL from '../../shared/img.urls';        
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

    // ============ Driver Details ============ // 

    geFirDetails():Observable<any>{
      var CaseID= localStorage.getItem('CaseID');
      const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
      return this.http.get(WIZARD_GETFIRDETAILS, {params})
          .map((res) =>{
              if(res){
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
    }

  

  postFirDetails(payload: any): Observable<any> { 
      return this.http.post(WIZARD_POSTFIRDETAILS, payload)        
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

  // GET CLAIM IMAGE //
  getDetailImg():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.CLAIMPOLICYIMG_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET FRONT IMAGE //
  getFrontCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.FRONTCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET BACK IMAGE //
  getBackCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.BACKCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET LEFT FRONT IMAGE //
  getLeftFrontCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.LEFTFRONTCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET LEFT IMAGE //
  getLeftCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.LEFTCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET LEFT REAR IMAGE //
  getLeftRearCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.LEFTREARCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET RIGHT FRONT IMAGE //
  getRightFrontCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.RIGHTFRONTCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET RIGHT IMAGE //
  getRightCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.RIGHTCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET RIGHT REAR IMAGE //
  getRightRearCrashImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.RIGHTREARCRASH_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET SUMMARY KYC ADDRESS IMAGE //
  getKycAddressImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.KYCADDRESS_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET SUMMARY CLAIM FORM IMAGE //
  getClaimFormImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.CLAIMFORM_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET SUMMARY SURVEY FEES BILL IMAGE //
  getSummarySurveyFeeImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.FEESBILLING_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET SUMMARY KYC DOC IMAGE //
  getKycDocImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.KYCDOC_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET SUMMARY REPORT DETAILS //
  getSummaryReportDetails():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
    return this.http.get(GETSUMMARYREPORT_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET DIGITAL SIGNATURE IMAGE //
  getSignatureImage():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.SIGNATURE_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }


}