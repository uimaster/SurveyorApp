import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../../users/users.service";
import {Subscription} from "rxjs/Subscription";
import {SurveyorService} from "../surveyor.service";

@Component({
  selector: 'app-create-surveyor',
  templateUrl: './create-surveyor.component.html',
  styleUrls: ['./create-surveyor.component.css']  ,
  providers: [SurveyorService]
})
export class CreateSurveyorComponent implements OnInit {

  public myForm: FormGroup;
  public successMessage:String;
  public errorMessage:String;
  public showError: boolean=false;
  public showSuccess: boolean=false;
  public sub: Subscription;
  public surveyorId: Number = 0;

  constructor(private fb: FormBuilder, private surveyorService: SurveyorService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {



    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
      mobile: ['', [Validators.required]],
      landline: [''],
      area: [1, Validators.required],
      city: [0],
      address: [],
      licenseNo:[],
      LicenceExpiryDate:[],
      expireDate: [null],
      GPSCordinates: [null],
      password: ['', Validators.required],
      company: [],
      active: [true, [Validators.required]]

    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.surveyorId = params['id'];

      if(this.surveyorId > 0){
        this.surveyorService.getSurveyorList().subscribe((data)=> {
            const finalData =  data.Data;

            for (let i = 0; i < finalData.length;  i++) {
              if (finalData[i].SurveyorsId == this.surveyorId) {
                this.myForm.controls['name'].setValue(finalData[i].Name);
                this.myForm.controls['email'].setValue(finalData[i].EmailId);
                this.myForm.controls['password'].setValue("");
                this.myForm.controls['mobile'].setValue(finalData[i].MobileNo);
                this.myForm.controls['landline'].setValue(finalData[i].LandLine);
                this.myForm.controls['area'].setValue(finalData[i].AreaId);
                 this.myForm.controls['company'].setValue(finalData[i].COMPANY_ID);
                 this.myForm.controls['LicenceExpiryDate'].setValue(finalData[i].LicenceExpiryDate);
                 this.myForm.controls['city'].setValue(finalData[i].CityId);
                  this.myForm.controls['address'].setValue(finalData[i].Address);
                  this.myForm.controls['expireDate'].setValue(finalData[i].ExpireDate);
                  this.myForm.controls['active'].setValue(finalData[i].IsActive);
                  this.myForm.controls['licenseNo'].setValue(finalData[i].LicenceNo);
                  this.myForm.controls['GPSCordinates'].setValue(finalData[i].GPSCordinates);
              }
            }
          },(error)=>{

          }
        );
      }


    });

  }


  onSubmit(formD) {
    let bodyObj = {
      "SurveyorsId":this.surveyorId,
      "Name":formD.name,
      "EmailId":formD.email,
      "Password":formD.password,
      "MobileNo":formD.MobileNo,
      "LandLine":formD.landline,
      "AreaId":formD.area,
      "CityId":formD.city,
      "Address":formD.address,
      "LicenceNo":formD.licenseNo,
      "LicenceExpiryDate":formD.LicenceExpiryDate,
      "ExpireDate" :formD.expireDate,
      "GPSCordinates":formD.GPSCordinates,
      "COMPANY_ID":formD.company,
      "IsActive":formD.active
    };

    this.surveyorService.addSurveyor(bodyObj).subscribe (
      result => {
        // Handle result
        console.log(result);
        this.showSuccess = true;
        this.successMessage = result.Message;
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.router.navigate(['/surveyor']);
        },2000);

      },
      error => {
        this.showError = true;
        this.errorMessage = error.message;
      },
      () => {
        // No errors, route to new page
      }
    );

  }


}
