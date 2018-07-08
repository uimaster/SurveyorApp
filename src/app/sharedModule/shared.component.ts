import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModuleServices } from '../sharedModule/shared.service';
import { WizardService } from '../wizard/wizard.service';
import { MULTIIMAGES_URL } from '../../shared/img.urls';

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

    constructor(private sharedService: SharedModuleServices, private http: HttpClient, public dialog: MatDialog,
        private wizardService: WizardService, private fb: FormBuilder) {
            this.uploadCrashImageForm = this.fb.group({
                ImageName: new FormControl('', Validators.required)
            })
        }

    ngOnInit() {
        this.getMultiImages();
        this.Loader = false;
        let completedState = localStorage.getItem('IsCompleted');
        if(completedState != undefined) {
            this.IsCompleted = JSON.parse(completedState);
        }

    }

    // DETAILS IMAGE //

    createImageFromBlob0(image: Blob) {
        let reader = new FileReader();
        this.multiImages = 'http://apiflacors.iflotech.in' + image;
    }

    openImageDialog(){
        this.uploadImageModal = true;
    }
    closeImageModal(){
        this.uploadImageModal = false;
    }

    onMultifileChange(event: any) {
        this.files = event.target.files;
    }
    changeshowfileEmptyMsg(){
        this.showfileEmptyMsg= false;
    }
    multiImage: any;
    isImageLoading = false;

    postMultiImage(data) {
        let imageName = this.uploadCrashImageForm.controls['ImageName'].value;
        if(this.files==undefined || this.files.length < 1 || imageName === null || imageName ==''){
            this.showfileEmptyMsg = true;
            return false;
        }
        else{
            this.showfileEmptyMsg = false;
            this.Loader = true;
            // let id = localStorage.getItem('CaseImageID');
            this.CaseImageID
            const formData = new FormData();
            formData.append('CaseID', this.caseId);
            formData.append('CaseImageID', this.CaseImageID || '0');
            for (const file of this.files) {
                formData.append(name, file);
                formData.append('ImageName', data.ImageName);
            }
            this.http.post(MULTIIMAGES_URL, formData).subscribe(
                res => {
                    console.log(res);
                });
            setTimeout(() => {
                this.getMultiImages();

            }, 1000);
            this.Loader = false;
            this.showUpdateBtn = false;
            this.uploadImageModal = false;
            // localStorage.setItem('CaseImageID', id);
        }
        this.files = [];
        this.uploadCrashImageForm.controls['ImageName'].setValue('');
        this.CaseImageID = '';

    }
    updateImgRadio(data) {
        this.showUpdateBtn = true;
        this.CaseImageID = data.CaseImageID;
        this.uploadCrashImageForm.controls['ImageName'].setValue(data.ImageName);
    }

    getMultiImages() {
        this.isImageLoading = true;
        this.sharedService.getMultiImages().subscribe(data => {
            if (data.Data[0] !== null && data.Data[0] !== undefined) {
                this.fileList = data.Data;
                this.createImageFromBlob0(data.Data[0].Image);
            }
            this.isImageLoading = false;
        }, error => {
            this.isImageLoading = false;
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
        this.downloadSpotSurvey();
    }
    toShowSecondData() {
      this.dialogRef.close();
      this.router.navigate(['/dashboard']);
    }

    downloadSpotSurvey() {
        const CaseID = localStorage.getItem('CaseID');
        const baseurl = 'http://apiflacors.iflotech.in/api/DownloadReport/getSpotSurveyReport?CaseID=';
        this.downloadUrl = baseurl + CaseID;
    }

    PostSpotCompletion(data) {

        const CaseID = localStorage.getItem('CaseID');
        const surveyorId = JSON.stringify(data);
        this.comletionForm = this.fb.group({
            CaseID: new FormControl(CaseID),
            SurveyStatusId: new FormControl(surveyorId)
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
