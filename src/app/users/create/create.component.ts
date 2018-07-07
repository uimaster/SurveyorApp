import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompaniesService } from '../../companies/companies.service';
import { SurveyorService } from '../../surveyor/surveyor.service';

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
      company: [''],
      SurveyorsId: [''],
      IsActive: ['', Validators.required]
    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];

      if (this.userId > 0) {
        this.userService.getUsersList().subscribe(
          data => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].UserId == this.userId) {
                this.myForm.controls['name'].setValue(data[i].Name);
                this.myForm.controls['email'].setValue(data[i].EmailId);
                this.myForm.controls['password'].setValue('');
                this.myForm.controls['userType'].setValue(data[i].UserTypeId);
                this.myForm.controls['company'].setValue(data[i].CompanyId);
                this.myForm.controls['IsActive'].setValue(data[i].IsActive);
                this.myForm.controls['SurveyorsId'].setValue(
                  data[i].SurveyorsId
                );

                const selectedUser = data[i].UserTypeId;
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
  }

  getUserType(event) {
    this.myForm.controls['company'].setValue('');
    this.myForm.controls['SurveyorsId'].setValue('');
    if (event.value === 1) {
      this.companyDisabled = true;
      this.surveyorDisabled = true;
    } else if (event.value === 2) {
      this.companyDisabled = false;
      this.surveyorDisabled = true;
    } else if (event.value === 3) {
      this.companyDisabled = true;
      this.surveyorDisabled = false;
    } else if (event.value === 4) {
      this.companyDisabled = true;
      this.surveyorDisabled = false;
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
      UserId: this.userId,
      Name: formValues.name,
      EmailId: formValues.email,
      Password: formValues.password,
      UserTypeId: formValues.userType,
      CompanyId: formValues.company,
      SurveyorsId: formValues.SurveyorsId,
      IsActive: formValues.IsActive
    };

    this.userService.addUser(bodyObj).subscribe(
      result => {
        // Handle result
        if (result.StatusCode == 200) {
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
