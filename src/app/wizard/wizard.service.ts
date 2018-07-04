import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { LoginRequest, LoginResponse} from '../login/login.model';
import * as urls from '../../shared/urls';
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
        return this.http.get(urls.WIZARD_GETCLAIMURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    postClaimDetails(payload: any): Observable<any> {
        return this.http.post(urls.WIZARD_POSTCLAIMURL, payload)
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
        return this.http.post(urls.WIZARD_POSTSURVEYORURL, payload)
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
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_GETVEHICLEDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    postVehicleDetails(payload: any): Observable<any> {
        return this.http.post(urls.WIZARD_POSTVEHICLEDETAILSURL, payload)
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

     // ============ Registraion Search for vehicle Details ============ //

     SearchRegistration(payload:any):Observable<any>{
        return this.http.get(urls.REGISTRATION_SEARCH_URL+"/"+payload)
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    // ============ Driver Details ============ //

    getDriverDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_GETDRIVERDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }



    postDriverDetails(payload: any): Observable<any> {
        return this.http.post(urls.WIZARD_POSTDRIVERDETAILSURL, payload)
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

    // ============ Accident Details ============ //

    geAccidentDetails():Observable<any>{
        var CaseID= localStorage.getItem('CaseID');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
        return this.http.get(urls.WIZARD_GETACCIDENTDETAILSURL, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }



    postAccidentDetails(payload: any): Observable<any> {
        return this.http.post(urls.WIZARD_POSTACCIDENTDETAILSURL, payload)
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

    // ============ FIR Details ============ //

    geFirDetails():Observable<any>{
      var CaseID= localStorage.getItem('CaseID');
      const params = new HttpParams().set('CaseID', JSON.parse(CaseID));
      return this.http.get(urls.WIZARD_GETFIRDETAILS, {params})
          .map((res) =>{
              if(res){
                  return res;
              }
          })
          .catch((error) => Observable.throw('server Error.'));
    }



  postFirDetails(payload: any): Observable<any> {
      return this.http.post(urls.WIZARD_POSTFIRDETAILS, payload)
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

  GetDamageDetails():Observable<any>{
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

GetDamagePartList():Observable<any>{
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

PostDamageDetails(payload: any): Observable<any> {
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

  // GET DRIVER LICENSE IMAGE //
  getDriverLicenseImg():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.DRIVERLICENSE_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // Upload Claim Form/Statement //
  getClaimFormStatement():Observable<any>{
    var CaseID= localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.CLAIMFORMSTATEMENT_URL, {params})
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
    return this.http.get(urls.GETSUMMARYREPORT_URL, {params})
        .map((res) =>{
            if(res){
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET DIGITAL SIGNATURE IMAGE //
  getSignatureImage(): Observable<any> {
    var CaseID = localStorage.getItem('CaseID');
    const params = new HttpParams().set('SurveyorsId', JSON.parse(CaseID));
    return this.http.get(IMAGEURL.SIGNATURE_URL, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET generateSpotSurvey //
  generateSpotSurvey(caseid): Observable<any> {
    var CaseID = localStorage.getItem('SpotCaseId');
    const params = new HttpParams().set('CaseID', JSON.parse(caseid));
    return this.http.get(urls.GENERATESPOTREPORT, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

  // GET generate Pre Survey //
  generatePreSurvey(caseid): Observable<any> {
    const CaseID = localStorage.getItem('PreCaseId');
    const params = new HttpParams().set('CaseID', JSON.parse(caseid));
    return this.http.get(urls.GENERATEPREREPORT, {params})
        .map((res) => {
            if (res) {
                return res;
            }
        })
        .catch((error) => Observable.throw('server Error.'));
  }

}
