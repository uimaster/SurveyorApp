import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { TabsRequest, TabsResponse} from './tabs.model';
import { DASHBOARDLIST, DASHBOARD_CAT_CASES, DASHBOARDTABCOUNTS} from '../../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class TabsService{
    SurveyorsId:any;
    companyId:any;

    constructor(private http: HttpClient){}
    
    getDashboardList():Observable<any>{
        this.SurveyorsId = localStorage.getItem('SurveyorsId');
        this.companyId = localStorage.getItem('CompanyId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID','0').set('CompanyID',JSON.parse(this.companyId));
        return this.http.get(DASHBOARDLIST, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    getTabCounts():Observable<any>{

        this.SurveyorsId = localStorage.getItem('SurveyorsId');
        this.companyId = localStorage.getItem('CompanyId');
        const params = new HttpParams().set('SurveyorsID', JSON.parse(this.SurveyorsId)).set('CompanyID',JSON.parse(this.companyId));
        return this.http.get(DASHBOARDTABCOUNTS, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }


    getProcessList():Observable<any>{
        this.SurveyorsId = localStorage.getItem('SurveyorsId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID','3');
        return this.http.get(DASHBOARD_CAT_CASES, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    getCompletedList():Observable<any>{
        this.SurveyorsId = localStorage.getItem('SurveyorsId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID','5');
        return this.http.get(DASHBOARD_CAT_CASES, {params})
            .map((res) =>{
                if(res){
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

}