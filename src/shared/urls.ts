import { BASE2URL } from './img.urls';
export const BASEURL = 'http://apiflacorev2.iflotech.in/api/';
// export const BASEURL = 'http://apiflacors.iflotech.in/api/';

// export const BASEURL = 'http://54.169.129.132/api/';
export const LOGINURL = BASEURL + 'jwtAuth/token';
export const DASHBOARDTABCOUNTS = BASEURL + 'Dashboard/GetDashboardCounts?';
export const DASHBOARDLIST = BASEURL + 'Dashboard/GetCaseList?';
export const GETUSERLIST_URL = BASEURL + 'masters/GetSurveyorUserList';
export const DASHBOARD_CAT_CASES = BASEURL + 'Dashboard/GetCaseList?';

export const WIZARD_GETCLAIMURL = BASEURL + 'SpotCases/GetSpotCaseDetails?';
export const WIZARD_POSTCLAIMURL = BASEURL + 'SpotCases/SpotClaimDetailsUpdate';
export const WIZARD_POSTSURVEYORURL = BASEURL + 'SpotCases/SpotSurveyDetailsUpdate';
export const WIZARD_GETVEHICLEDETAILSURL = BASEURL + 'SpotCases/GetSpotCaseVehicleDetails?';
export const WIZARD_POSTVEHICLEDETAILSURL = BASEURL + 'SpotCases/SpotSurveyVehicleDetailsUpdate';
export const WIZARD_GETDRIVERDETAILSURL = BASEURL + 'SpotCases/GetSpotCaseDriverDetails';
export const WIZARD_POSTDRIVERDETAILSURL = BASEURL + 'SpotCases/SpotSurveyDriverDetailsUpdate';
export const WIZARD_GETACCIDENTDETAILSURL = BASEURL + 'SpotCases/GetSpotCaseAccidentDetails';
export const WIZARD_POSTACCIDENTDETAILSURL = BASEURL + 'SpotCases/SpotSurveyAccidentDetailsUpdate';
export const WIZARD_GETFIRDETAILS = BASEURL + 'SpotCases/GetSpotCaseFIRDetails?';
export const WIZARD_POSTFIRDETAILS = BASEURL + 'SpotCases/SpotSurveyFIRDetailsUpdate';

export const USERSLIST = BASEURL + 'Masters/getUserList';
export const UPDATE_CRAETE_USERS_URL = BASEURL + 'Masters/UpdateUser';
export const SURVEYORLIST = BASEURL + 'Masters/getSurveyors';
export const UPDATE_CRAETE_SURVEYOR_URL = BASEURL + 'Masters/UpdateSurveyor';
export const AREALIST = BASEURL + 'Masters/getAreas';
export const UPDATE_CRAETE_AREA_URL = BASEURL + 'Masters/UpdateArea';
export const COMPANYLIST = BASEURL + 'Masters/getCompanyList';
export const UPDATE_CRAETE_COMPANY_URL = BASEURL + 'Masters/UpdateCompany';
export const CREATECOMPANY = BASEURL + 'MasterCompany';

export const GETSUMMARYREPORT_URL = BASEURL + 'SpotCases/GetSpotReportSummary';
export const DAMAGEDETAILS_URL = BASEURL + 'CarDemageDetailEntry';
export const GENERATESPOTREPORT = BASEURL + 'Reports/GenerateSpotReport';
export const GENERATEPREREPORT = BASEURL + 'Reports/GeneratePIReport';
export const DOWNLOADSPOTREPORT = BASEURL + 'DownloadReport/getSpotSurveyReport';
export const SPOTCOMPLETIONURL = BASEURL + 'CaseCompleteStatus';
export const SPOTCREATECASE = BASEURL + 'SpotCases/SPOTCreateCase';
export const PRECREATECASE = BASEURL + 'PICases/PICreateCase';

// URLS FOR PRE WIZARD //
export const WIZARD_CASEDETAILS_URL = BASEURL + 'PICases/GetPICaseDetails';
export const WIZARD_CASEDETAILSPOST_URL = BASEURL + 'PICases/PICaseDeailsUpdate';
export const WIZARD_VEHICLEDETAILSURL_PRE = BASEURL + 'PICases/GetPIVehicleDetails';
export const WIZARD_VEHICLEDETAILSURLPOST_PRE = BASEURL + 'PICases/PICaseVehicleDetailsUpdate';
export const WIZARD_INSURANCEURL_PRE = BASEURL + 'PICases/GetPIInsuranceDetails';
export const WIZARD_INSURANCEURLPOST_PRE = BASEURL + 'PICases/PICaseInsuranceDetailsUpdate';
export const WIZARD_CONCLUSIONURL_PRE = BASEURL + 'PICases/GetPIConclusionDetails';
export const WIZARD_CONCLUSIONURLPOST_PRE = BASEURL + 'PICases/PICaseConclusionUpdate';

export const WIZARD_DAMAGEDETAILSURL_PRE = BASEURL + 'VehicleInfo/getVehicleDamageDetails';
export const WIZARD_DAMAGEDETAILSURL_PRE_POST = BASEURL + 'VehicleInfo/VehicleDamageDetailsUpdate';
export const WIZARD_DAMAGEPARTSLIST_PRE = BASEURL + 'VehicleInfo/GetVehiclePartsList';
export const WIZARD_CASECOMPLETEURL_PRE = BASEURL + 'CaseCompleteStatus';
export const GENERATESPOTREPORT_PRE = BASEURL + 'PIReports';
export const DOWNLOADSPOTREPORT_PRE = BASEURL + 'DownloadReport/PIDownloadReport';

// REGISTRATION NUMBER SEARCH URL //
export const REGISTRATION_SEARCH_URL = BASEURL + 'VehicleInfo/GetVehicleRegNoData?';

// TO GET CASE STATUS OF ALL STEPS //
export const SPOTALLSTEPS_STATUS_URL = BASEURL + 'SpotCases/GetCaseSPOTStatus';
export const PIALLSTEPS_STATUS_URL = BASEURL + 'PICases/GetCasePIStatus';

// COMMON IMAGES GET/POST ULRS //
export const GETIMAGEBASE_URL = 'http://apiflacorev2.iflotech.in';
export const POSTIMAGE_URL = BASEURL + 'CaseImages/CaseImageUpload';
export const GETIMAGE_URL = BASEURL + 'CaseImages/GetCaseImageLink';
export const GETACCIDENTIMAGELIST_URL = BASEURL + 'CaseImages/GetCaseImageList';
