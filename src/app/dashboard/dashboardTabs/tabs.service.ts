import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { TabsRequest, TabsResponse} from './tabs.model';
import { DASHBOARDLIST, DASHBOARD_CAT_CASES, DASHBOARDTABCOUNTS} from '../../../shared/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class TabsService {
    SurveyorsId = localStorage.getItem('SurveyorsId');
    companyId = localStorage.getItem('CompanyId');
    UserID = localStorage.getItem('UserId');

    constructor(private http: HttpClient) {}

    getDashboardList(payload: any): Observable<any> {
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID', '0')
        .set('CompanyID', JSON.parse(this.companyId)).set('UserID', payload);
        return this.http.get(DASHBOARDLIST, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    getTabCounts(payload: any): Observable<any> {
        const params = new HttpParams().set('SurveyorsID', JSON.parse(this.SurveyorsId)).set('CompanyID', JSON.parse(this.companyId))
        .set('UserID', payload);
        return this.http.get(DASHBOARDTABCOUNTS, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }


    getProcessList(payload: any): Observable<any> {
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID', '3')
        .set('CompanyID', JSON.parse(this.companyId)).set('UserID', payload);
        return this.http.get(DASHBOARD_CAT_CASES, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

    getCompletedList(payload: any): Observable<any> {
        const params = new HttpParams().set('SurveyorsId', JSON.parse(this.SurveyorsId)).set('CaseStatusID', '5')
        .set('CompanyID', JSON.parse(this.companyId)).set('UserID', payload);
        return this.http.get(DASHBOARD_CAT_CASES, {params})
            .map((res) => {
                if (res) {
                    return res;
                }
            })
            .catch((error) => Observable.throw('server Error.'));
    }

}
