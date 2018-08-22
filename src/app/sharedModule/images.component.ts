import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedModuleServices } from './shared.service';
import { POSTIMAGE_URL} from '../../shared/urls';
import * as imageModels from './shared.model';

@Injectable()
export class CommonImageComponent {

  files = [];
  caseId = localStorage.getItem('CaseID');
  getImageData: imageModels.GetImageResponse;
  isImageLoading = false;
  data = {};
  Loader = true;

  constructor( private sharedService: SharedModuleServices, private httpClient: HttpClient) {}



  postDetailImage(event: any, payload: imageModels.PostImageRequestModel) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('CaseID', payload.CaseID);
    formData.append('ImageName', payload.ImageName);
    formData.append('CaseImageCode', payload.CaseImageCode);
    formData.append('CaseImageID', payload.CaseImageID);
    for (const file of this.files) {
      formData.append(name, file, file.name);
    }
    this.httpClient.post(POSTIMAGE_URL, formData).subscribe((res: imageModels.PostImageResponseModel) => {
      alert('Image uploaded successfully !');
      //console.log(res);
    });
  }

  // getImage(data) {
  //   this.data = {};
  //   this.sharedService.getImages(data)
  //   .subscribe((res: imageModels.GenericGetImageResponseModel) => {
  //     if (res && res.Data != null) {
  //       this.data = res;
  //       return res;
  //     }
  //   },
  //   error => {
  //     return error;
  //   });
  // }

}
