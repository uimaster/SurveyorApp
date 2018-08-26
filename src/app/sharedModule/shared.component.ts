import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModuleServices } from '../sharedModule/shared.service';
import { WizardService } from '../vehicle-survey/spot-wizard/wizard.service';
import { POSTIMAGE_URL } from '../../shared/urls';

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.scss']
})

export class SharedComponent implements OnInit {
    public files: any[];
    caseId: any = localStorage.getItem('CaseID');
    fileList = [];
    showUpdateBtn = false;
    uploadCrashImageForm: FormGroup;
    uploadImageModal = false;
    Loader = true;
    CaseImageID: any;
    showfileEmptyMsg = false;
    IsCompleted: boolean;
    multiImages: any;
    multiImage: any;
    isImageLoading = false;
    // imageBaseUrl = 'http://apiflacorev2.iflotech.in';
    imageBaseUrl = 'http://apiflacorev2.iflotech.in';

    constructor(private sharedService: SharedModuleServices, private http: HttpClient, public dialog: MatDialog,
        private wizardService: WizardService, private fb: FormBuilder) {
            this.uploadCrashImageForm = this.fb.group({
                ImageName: new FormControl('', Validators.required)
            });
        }

    ngOnInit() {
        this.getMultiImages();
        this.Loader = false;
        const completedState = localStorage.getItem('IsCompleted');
        if (completedState != undefined) {
            this.IsCompleted = JSON.parse(completedState);
        }

    }



    // DETAILS IMAGE //

    createImageFromBlob0(image: Blob) {
        let reader = new FileReader();
        this.multiImages = this.imageBaseUrl + image;
    }

    openImageDialog(){
        this.uploadImageModal = true;
    }
    closeImageModal(){
        this.uploadImageModal = false;
    }

    onMultifileChange(event: any) {
      const file = event.target.value;
      const allowedFiles = ['.gif', '.jpg', '.jpeg', '.png'];
      const regex = new RegExp('([a-zA-Z0-9\s_\\.\-:])+(' + allowedFiles.join('|') + ')$');
      if (!regex.exec(file)) {
        alert('Please upload ' + allowedFiles.join(', ') + ' files only.');
        this.Loader = false;
        return false;
      }
      this.files = event.target.files;
    }
    changeshowfileEmptyMsg() {
        this.showfileEmptyMsg = false;
    }

    postMultiImage(data) {
        this.showUpdateBtn = true;
        const imageName = this.uploadCrashImageForm.controls['ImageName'].value;
        if (this.files == undefined || this.files.length < 1 || imageName === null || imageName == '') {
            this.showfileEmptyMsg = true;
            return false;
        } else {

        this.showfileEmptyMsg = false;
        this.Loader = true;
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        formData.append('ImageName', imageName);
        formData.append('CaseImageCode', 'VHIMGS');
        formData.append('CaseImageID', this.CaseImageID || 0);
        for (const file of this.files) {
          formData.append(name, file, file.name);
        }

        this.http.post(POSTIMAGE_URL, formData).subscribe(
            res => {
              alert('Image uploaded successfully !');
             // console.log(res);
            });
        setTimeout(() => {
            this.getMultiImages();

        }, 1000);
        this.Loader = false;
        this.uploadImageModal = false;
        // localStorage.setItem('CaseImageID', id);
      }
      this.files = [];
      this.uploadCrashImageForm.controls['ImageName'].setValue('');
      this.CaseImageID = '';

    }
    updateImgRadio(data) {
      this.CaseImageID = data.CaseImageID;
      this.uploadCrashImageForm.controls['ImageName'].setValue(data.ImageName);
      this.openImageDialog();
    }

    specialCharPrevention(event) {
      const key = event.keyCode;
      const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
        key === 55 || key === 48  || key === 57 || key === 186 ));
      if (preventsKey) {
        console.log('Special characters not allowed');
        return false;
      }
    }

    getMultiImages() {
        this.isImageLoading = true;
        this.sharedService.getMultiImages(this.caseId).subscribe(data => {
            if (data.Data[0] !== null && data.Data[0] !== undefined) {
                this.fileList = data.Data;
                this.createImageFromBlob0(data.Data[0].Image);
                setTimeout(() => {
                  this.showUpdateBtn = false;
                }, 3000);
            }
            this.isImageLoading = false;
            this.Loader = false;

        }, error => {
            this.isImageLoading = false;
            this.showUpdateBtn = false;
            this.Loader = false;
            console.log(error);
        });
    }


}





@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './sharedDialog.html',
    styleUrls: ['./shared.component.scss']
})
export class DonwloadDialog implements OnInit {
    showFirstData = true;
    showSecondData = false;
    downloadUrl = '';
    comletionForm: FormGroup;
    msg = '';
    constructor(
        public dialogRef: MatDialogRef<DonwloadDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private wizardService: WizardService,
         private sharedService: SharedModuleServices, private fb: FormBuilder) { }

    closeDialog(): void {
        this.dialogRef.close();
        localStorage.setItem('showDownload', 'true');
        localStorage.setItem('showTittle', 'false');
        setTimeout(() => {
            this.router.navigate(['/dashboard']);
        }, 1000);
    }
    ngOnInit() {
        // this.downloadSpotSurvey(caseId, caseTypeId);
    }
    toShowSecondData() {
      this.dialogRef.close();
      this.router.navigate(['/dashboard']);
    }



    PostSpotCompletion(data) {

        const CaseID = localStorage.getItem('CaseID');
        // const surveyorId = JSON.stringify(data);
        this.comletionForm = this.fb.group({
            CaseID: new FormControl(CaseID),
            SurveyStatusId: new FormControl(data)
        });

        this.sharedService.PostSpotCompletion(this.comletionForm.value).subscribe(res => {
            if (res) {
                this.msg = res.Message;
            }
        });

        this.showSecondData = true;
        setTimeout(() => {
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
        }, 2000);
    }


}



// @Component({
//     selector: 'crashImage-dialog',
//     templateUrl: './crashImageDialog.html',
//     styleUrls: ['./shared.component.scss']
// })
// export class CrashImageDialog implements OnInit {

//     constructor(
//         public dialogRef: MatDialogRef<DonwloadDialog>,
//         @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private wizardService: WizardService) { }

//     closeDialog(): void {
//         this.dialogRef.close();

//     }
//     ngOnInit() {

//     }

// }
