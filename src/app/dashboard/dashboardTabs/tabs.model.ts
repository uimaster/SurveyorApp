export interface TabsRequest{
    SurveyorsId:number;
}

export interface TabsResponse{
    massage: string,
    status: number,
    SurveyCases11: TabsGenericResponse
}

export interface TabsGenericResponse{
    CaseID: number,
    CaseNo: string,
    CaseDate: string,
    ClaimNO: string,
    PolicyNO: string,
    CompanyId:number,
    CompanyName: string,
    CustomerName: string,
    CustomerAddress: string,
    CustomerMobile: string,
    CustomerLandLine: string,
    CaseTypeId: number,
    CaseTypeName: string,
    SurveyorsId: number,
    SurveyorsName: string,
    AssignedDateTime: string,
    SurveyLocation: string,
    SurveyGeoCodes: string,    
    SurveyStatusId: number,    
    SurveyStatusName: string,
    StatusChangeDateTime: string,
    DateofAllotmentofsurvey: string,
    DateofSurvey: string,
    PlaceofSurvey: number,
    InsuredName: string,
    InsuredAddress: string,
    InsuredMobile: string,
    EmailID: string,    
    CmpnyName: string
}