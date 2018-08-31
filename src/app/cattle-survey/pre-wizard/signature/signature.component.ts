import { Component, OnInit, Input } from '@angular/core';
import { SharedModuleServices } from '../../../sharedModule/shared.service';
import { CommonImageComponent } from '../../../sharedModule/images.component';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {

  @Input() stepper: any;
  Loader = true;
  caseId = localStorage.getItem('CaseID');
  caseNO = localStorage.getItem('CaseNO');
  showSignBroseBtn: boolean;
  imageData = [];
  animalImageUrl: string;
  animalImageUrl2: string;
  imageBaseUrl = 'http://apiflacorev2.iflotech.in';
  constructor(private sharedService: SharedModuleServices, private imageService: CommonImageComponent) { }

  ngOnInit() {
    this.getImage('SPDSG');
  }

  postImage(files, typeCode) {
    this.Loader = true;
    const file = files.target.value;
    const ClaimImgPostpayload = {
      CaseID: this.caseId,
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
    }, 1000);

  }

  getImage(typeCode) {
    this.Loader = true;
    const ClaimGetPayload = { CaseID: this.caseId, CaseImageCode: typeCode };
    this.sharedService.getImages(ClaimGetPayload).subscribe(
      (res) => {

        this.imageData = res.Data;
        if (this.imageData.length > 0) {
          localStorage.setItem('showSignBroseBtn', 'true');
          switch (typeCode) {
            case 'SPDSG':
              this.animalImageUrl = this.imageBaseUrl + this.imageData[0].Image;
              break;
            default:
            this.animalImageUrl = '';
          }
          this.Loader = false;
        }
        if (this.animalImageUrl !== undefined) {
          this.showSignBroseBtn = false;
          this.Loader = false;
        }
      },
      error => {
        this.Loader = false;
        return error;
      }
    );
  }

  previous() {
    setTimeout(() => {
      this.stepper.previous();
    }, 1000);
  }

}
