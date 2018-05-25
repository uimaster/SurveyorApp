import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { TabsRequest, TabsResponse} from './tabs.model';
import { DASHBOARDALLCASES, DASHBOARD_CAT_CASES} from '../../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class TabsService{
    SurveyorsId:any;
    
    constructor(private http: HttpClient){}
    
    getTabsDetails():Observable<any>{
        this.SurveyorsId = localStorage.getItem('SurveyorsId');
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId));
        return this.http.get(DASHBOARDALLCASES, {params})
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

}