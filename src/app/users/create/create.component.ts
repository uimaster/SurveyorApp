import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompaniesService } from '../../companies/companies.service';
import { SurveyorService } from '../../surveyor/surveyor.service';
import { REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public myForm: FormGroup;
  public successMessage: String;
  public errorMessage: String;
  public showError = false;
  public showSuccess = false;
  public sub: Subscription;
  public userId: Number = 0;
  Loader = true;
  companyListData = [];
  surveyorList = [];
  companyDisabled = true;
  surveyorDisabled = true;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompaniesService,
    private surveyorService: SurveyorService
  ) {}

  getSurveyorList() {
    this.surveyorService.getSurveyorList().subscribe(res => {
      this.surveyorList = res.Data;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getSurveyorList();
    }, 1000);



    this.Loader = false;
    this.myForm = this.fb.group({
      name: ['' , Validators.required],
      userId: [0 , Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_.-]*$/),
          Validators.minLength(5)
        ]
      ],
      userType: ['', Validators.required],
      company: ['', Validators.required],
      surveyorsId: [0, Validators.required],
      isActive: ['', Validators.required]
    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];

      if (this.userId > 0) {
        debugger;
        this.userService.getUsersList().subscribe(
          data => {
            console.log(data.Data);
            for (let i = 0; i < data.Data.length; i++) {
              if (data.Data[i].UserId == this.userId) {
                this.myForm.controls['userId'].setValue(data.Data[i].UserId);
                this.myForm.controls['name'].setValue(data.Data[i].Name);
                this.myForm.controls['email'].setValue(data.Data[i].EmailId);
                this.myForm.controls['password'].setValue('');
                this.myForm.controls['password'].setValidators(Validators.minLength(5));
                this.myForm.controls['password'].updateValueAndValidity();
                this.myForm.controls['userType'].setValue(data.Data[i].UserTypeId);
                this.myForm.controls['company'].setValue(data.Data[i].CompanyId);
                this.myForm.controls['isActive'].setValue(data.Data[i].IsActive);
                this.myForm.controls['surveyorsId'].setValue(
                  data.Data[i].SurveyorsId
                );

                const selectedUser = data.Data[i].UserTypeId;
                if (selectedUser === 1) {
                  this.companyDisabled = true;
                  this.surveyorDisabled = true;
                } else if (selectedUser === 2) {
                  this.companyDisabled = false;
                  this.surveyorDisabled = true;
                } else if (selectedUser === 3) {
                  this.companyDisabled = true;
                  this.surveyorDisabled = false;
                }
              }
            }
          },
          error => {}
        );
      }
    });
    setTimeout(() => {
      this.getCompanyList();
    }, 1000);

    setTimeout(() => {
      const userValue = this.myForm.controls['userType'].value;
      this.getUserType(userValue);
    }, 500);

  }

  getUserType(event) {
    debugger;

    if (event === 1) {
      // this.myForm.controls['company'].setValue('');
      // this.myForm.controls['surveyorsId'].setValue('');
      this.myForm.controls['company'].clearValidators();
      this.myForm.controls['company'].updateValueAndValidity();
      this.myForm.controls['surveyorsId'].clearValidators();
      this.myForm.controls['surveyorsId'].updateValueAndValidity();
      this.companyDisabled = true;
      this.surveyorDisabled = true;
    } else if (event === 2) {
      this.companyDisabled = false;
      this.surveyorDisabled = true;
      // this.myForm.controls['surveyorsId'].setValue('');
      this.myForm.controls['surveyorsId'].clearValidators();
      this.myForm.controls['surveyorsId'].updateValueAndValidity();
      this.myForm.controls['company'].setValidators(Validators.required);
      this.myForm.controls['company'].updateValueAndValidity();
    } else if (event === 3) {
      this.companyDisabled = true;
      this.surveyorDisabled = false;
      // this.myForm.controls['company'].setValue('');
      this.myForm.controls['company'].clearValidators();
      this.myForm.controls['company'].updateValueAndValidity();
      this.myForm.controls['surveyorsId'].setValidators(Validators.required);
      this.myForm.controls['surveyorsId'].updateValueAndValidity();
    } else if (event === 4) {
      this.companyDisabled = true;
      this.surveyorDisabled = false;
      // this.myForm.controls['company'].setValue('');
      this.myForm.controls['company'].clearValidators();
      this.myForm.controls['company'].updateValueAndValidity();
      this.myForm.controls['surveyorsId'].setValidators(Validators.required);
      this.myForm.controls['surveyorsId'].updateValueAndValidity();
    }
  }

  getCompanyList() {
    this.companyService.getCompanyList().subscribe(res => {
      this.companyListData = res.Data;
    });
  }

  onSubmit(formD) {
    this.Loader = true;
    let formValues = formD.value;
    let bodyObj = {
      UserId: formValues.userId,
      Name: formValues.name,
      EmailId: formValues.email,
      Password: formValues.password,
      UserTypeId: formValues.userType,
      CompanyId: formValues.company,
      SurveyorsId: formValues.surveyorsId,
      IsActive: formValues.isActive
    };

    this.userService.addUser(bodyObj).subscribe(
      result => {
        // Handle result
        if (result.Status == 200) {
          this.showSuccess = true;
          this.showError = false;
          this.successMessage = result.Message;
          setTimeout(() => {
            this.router.navigate(['/users']);
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
        this.showError = false;
        this.errorMessage = error.Message;
        this.Loader = false;
      },
      () => {
        // No errors, route to new page
      }
    );
  }
}
