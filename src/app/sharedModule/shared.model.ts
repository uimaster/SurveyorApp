export interface PostImageRequestModel {
  CaseID: any;
  ImageName: string;
  CaseImageCode: string;
  CaseImageID: any;
}

export interface PostImageResponseModel {
  Data: any[];
  Message: string;
  Status: string;
}

export interface GenericGetImageRequestModel {
  CaseID: any;
  CaseImageCode: string;
}

export interface GenericGetImageResponseModel {
  Data: GetImageResponse;
  Message: string;
  Status: string;
}

export interface GetImageResponse {
  Image: string;
  CaseID: any;
  ImageName: string;
  CaseImageCode: string;
  CaseImageID: any;
}
