import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UsersService} from '../../users/users.service';
import {Subscription} from 'rxjs/Subscription';
import {SurveyorService} from '../surveyor.service';
import { AreaService } from '../../area/area.service';

@Component({
  selector: 'app-create-surveyor',
  templateUrl: './create-surveyor.component.html',
  styleUrls: ['./create-surveyor.component.css']  ,
  providers: [SurveyorService]
})
export class CreateSurveyorComponent implements OnInit {

  public myForm: FormGroup;
  public successMessage: String;
  public errorMessage: String;
  public showError = false;
  public showSuccess = false;
  public sub: Subscription;
  public surveyorsId: Number = 0;
  Loader = true;
  areaList = [];

  constructor(private fb: FormBuilder, private surveyorService: SurveyorService, private router: Router, private route: ActivatedRoute,
     private areaService: AreaService) { }


  ngOnInit() {

    this.Loader = false;
    this.surveyorsId = JSON.parse(localStorage.getItem('SurveyorsId'));
    console.log(this.surveyorsId);
    this.myForm = this.fb.group({
      surveyorsId: [this.surveyorsId],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]],
      landline: ['', Validators.pattern(/^[0-9]*$/)],
      areaId: [0],
      areaList: ['', Validators.required],
      city: ['0'],
      address: [],
      licenseNo: [],
      licenceExpiryDate: [''],
      // expireDate: [null],
      GPSCordinates: [null],
      password: [''],
      // company: ['', Validators.required],
      active: [true, [Validators.required]]

    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.surveyorsId = params['id'];

      if(this.surveyorsId > 0) {
        this.surveyorService.getSurveyorList().subscribe((data) => {
            const finalData =  data.Data;

            for (let i = 0; i < finalData.length;  i++) {
              if (finalData[i].SurveyorsId == this.surveyorsId) {
                this.myForm.controls['surveyorsId'].setValue(finalData[i].SurveyorsId);
                this.myForm.controls['name'].setValue(finalData[i].Name);
                this.myForm.controls['email'].setValue(finalData[i].EmailId);
                this.myForm.controls['password'].setValue('');
                this.myForm.controls['mobileNo'].setValue(finalData[i].MobileNo);
                this.myForm.controls['landline'].setValue(finalData[i].LandLine);
                this.myForm.controls['areaId'].setValue(0);
                this.myForm.controls['areaList'].setValue(finalData[i].AreaList);
                //  this.myForm.controls['company'].setValue(finalData[i].COMPANY_ID);
                 this.myForm.controls['licenceExpiryDate'].setValue(finalData[i].LicenceExpiryDate);
                 this.myForm.controls['city'].setValue('0');
                  this.myForm.controls['address'].setValue(finalData[i].Address);
                  this.myForm.controls['licenceExpiryDate'].setValue(finalData[i].LicenceExpiryDate);
                  this.myForm.controls['active'].setValue(finalData[i].IsActive);
                  this.myForm.controls['licenseNo'].setValue(finalData[i].LicenceNo);
                  this.myForm.controls['GPSCordinates'].setValue(finalData[i].GPSCordinates);
              }
            }
          }, (error) => {}
        )}
    });
    this.getAreaList();
  }

  getAreaList() {
    this.areaService.getAreaList()
      .subscribe(res => {
        this.areaList = res.Data;
    });
  }

  specialCharPrevention(event) {
    const key = event.keyCode;
    const preventsKey = (( key === 192 || key === 190 || key === 188 || key === 222 || key === 221 || key === 219 ||
     key === 57 || key === 186 ));
    if (preventsKey) {
      console.log('Special characters not allowed');
      return false;
    }
  }

  onSubmit(formD) {
    this.Loader = true;
    const bodyObj = {
      'SurveyorsId': formD.surveyorsId,
      'Name': formD.name,
      'EmailId': formD.email,
      'Password': formD.password,
      'MobileNo': formD.mobileNo,
      'LandLine': formD.landline,
      'AreaId': 0,
      'AreaList': formD.areaList,
      'CityId': '0',
      'Address': formD.address,
      'LicenceNo': formD.licenseNo,
      'LicenceExpiryDate': formD.licenceExpiryDate,
      // 'ExpireDate' :formD.expireDate.toLocaleDateString('en-GB'),
      'GPSCordinates': formD.GPSCordinates,
      // 'COMPANY_ID':formD.company,
      'IsActive': formD.active
    };
    console.log(bodyObj);

    this.surveyorService.addSurveyor(bodyObj).subscribe (
      result => {
        // Handle result
        if ( result.Status == 200) {
          this.showSuccess = true;
          this.showError = false;
          this.successMessage = result.Message;
          setTimeout(() => {
            this.router.navigate(['/surveyor']);
          }, 2000);
          this.Loader = false;
        } else {
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = result.Message;
          this.Loader = false;
        }
      },
      error => {
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = error.Message;
        this.Loader = false;
      },
      () => {
        // No errors, route to new page
      }
    );

  }


}
