import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModuleServices } from '../sharedModule/shared.service';
import { WizardService } from '../wizard/wizard.service';
import { MULTIIMAGES_URL } from '../../shared/img.urls';

@Component({
    selector: 'crashImage-dialog',
    templateUrl: './crashImageDialog.html',
    styleUrls: ['./shared.component.scss']
})
export class CrashImageDialog implements OnInit {
    uploadCrashImageForm: FormGroup;
    public files: any[];
    caseId: any = localStorage.getItem('CaseID');
    fileList = [];
    showUpdateBtn: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CrashImageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private wizardService: WizardService,
         private fb: FormBuilder, private sharedService: SharedModuleServices, private http: HttpClient) { 

            this.uploadCrashImageForm = this.fb.group({
                FileName: new FormControl('', Validators.required)
            })
        }

    closeDialog(): void {
        this.dialogRef.close();

    }
    ngOnInit() {
        // this.getMultiImages();
    }


    // DETAILS IMAGE //

    createImageFromBlob0(image: Blob) {
        let reader = new FileReader();
        this.multiImages = 'http://apiflacors.iflotech.in' + image;
    }

    onMultifileChange(event: any) {
        this.files = event.target.files;        
    }
    multiImages: any;
    isImageLoading: boolean = false;

    postMultiImage(data) {
        console.log(data);
        let id = localStorage.getItem('CaseImageID');
        const formData = new FormData();
        formData.append('CaseID', this.caseId);
        formData.append('CaseImageID', id || '0');
        for (const file of this.files) {
            formData.append(name, file);
            formData.append('ImageName', file.name);
            formData.append('FileName', file.name);
        }
        this.http.post(MULTIIMAGES_URL, formData).subscribe(
            res => {
                console.log(res);
            });
        setTimeout(() => {
            this.getMultiImages();
        }, 1000);
        this.showUpdateBtn = false;

    }
    updateImgRadio(id) {
        this.showUpdateBtn = true;
        localStorage.setItem('CaseImageID', id);
    }

    getMultiImages() {
        this.isImageLoading = true;
        this.sharedService.getMultiImages().subscribe(data => {
            if (data.Data[0] !== null && data.Data[0] !== undefined) {
                this.fileList = data.Data;
                console.log(this.fileList);
                this.createImageFromBlob0(data.Data[0].Image);
            }
            this.isImageLoading = false;
        }, error => {
            this.isImageLoading = false;
            console.log(error);
        });
    }
}