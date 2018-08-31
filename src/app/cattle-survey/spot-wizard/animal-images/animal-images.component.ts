import { Component, OnInit } from '@angular/core';
import { CommonImageComponent } from '../../../sharedModule/images.component';
import { SharedModuleServices } from '../../../sharedModule/shared.service';

@Component({
  selector: 'app-animal-images',
  templateUrl: './animal-images.component.html',
  styleUrls: ['./animal-images.component.scss']
})
export class AnimalImagesComponent implements OnInit {
  imageBaseUrl = 'http://apiflacorev2.iflotech.in';
  Loader = true;
  animalDeadUrl: string;
  animalInjuredUrl: string;
  removedEarTagUrl: string;
  intactEarTagUrl: string;
  vRecordUrl: string;
  doctorRecordsUrl: string;
  medicalBillUrl: string;
  caseID = JSON.parse(localStorage.getItem('CaseID'));
  caseNO = localStorage.getItem('CaseNO');
  SurveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
  showSignBroseBtn = false;
  imageData = [];
  constructor(
    private imageService: CommonImageComponent,
    private sharedService: SharedModuleServices
  ) { }

  ngOnInit() {
    // get image of claim details //
    this.getImage('LSDDEARTAG');
    // get image of Driver details //
    this.getImage('LSDDINS');
    // get image of Driver details //
    this.getImage('LSDDREATAG');
    // get image of Survey Fee Bill details //
    this.getImage('LSDREARTAG');
    // get image of KYC Doc details //
    this.getImage('SPKYIDN');
    // get image of KYC Address details //
    this.getImage('LSVHR');
    // get image Signature details //
    this.getImage('LSSDR');
    // get image Signature details //
    this.getImage('LSMB');
  }

  // =========================IMAGES FUNCNTIONS  START============================== //
  postImage(files, typeCode) {
    this.Loader = true;
    const file = files.target.value;
    const ClaimImgPostpayload = {
      CaseID: this.caseID,
      ImageName: '',
      CaseImageCode: typeCode,
      CaseImageID: 1
    };

    const allowedFiles = ['.gif', '.jpg', '.jpeg', '.png'];
    const regex = new RegExp('([a-zA-Z0-9\s_\\.\-:])+(' + allowedFiles.join('|') + ')$');
    if (!regex.exec(file)) {
      alert('Please upload ' + allowedFiles.join(', ') + ' files only.');
      this.Loader = false;
      return false;
    }
    this.imageService.postDetailImage(files, ClaimImgPostpayload);
    this.showSignBroseBtn = false;
    this.Loader = true;
    setTimeout(() => {
      this.getImage(typeCode);
    }, 2000);

  }

  getImage(typeCode) {
    this.Loader = true;
    const ClaimGetPayload = { CaseID: this.caseID, CaseImageCode: typeCode };
    this.sharedService.getImages(ClaimGetPayload).subscribe(
      (res) => {

        this.imageData = res.Data;
        if (this.imageData.length > 0 && this.imageData !== undefined) {
          localStorage.setItem('showSignBroseBtn', 'true');
          switch (typeCode) {
            case 'LSDDEARTAG':
              this.animalDeadUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSDDINS':
              this.animalInjuredUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSDDREATAG':
              this.removedEarTagUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSDREARTAG':
              this.intactEarTagUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSVHR':
              this.vRecordUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSSDR':
              this.doctorRecordsUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            case 'LSMB':
              this.medicalBillUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            default:
            this.medicalBillUrl = this.imageBaseUrl + this.imageData[0].Image;
          }
          this.Loader = false;
        }
      },
      error => {
        this.Loader = false;
        return error;
      }
    );
  }

  // =========================IMAGES FUNCNTIONS  END============================== //
}
