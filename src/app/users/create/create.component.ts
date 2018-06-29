import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from "../users.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public myForm: FormGroup;
  public successMessage: String;
  public errorMessage: String;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public sub: Subscription;
  public userId: Number = 0;
  Loader: boolean = true;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.Loader = false;
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/), Validators.minLength(5)]],
      userType: ['', [Validators.required]],
      company: ['', [Validators.required]],
      active: [true, [Validators.required]]

    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];

      if (this.userId > 0) {
        this.userService.getUsersList().subscribe((data) => {

            for (let i = 0; i < data.length; i++) {
              if (data[i].UserId == this.userId) {
                this.myForm.controls['name'].setValue(data[i].Name);
                this.myForm.controls['email'].setValue(data[i].EmailId);
                this.myForm.controls['password'].setValue("");
                this.myForm.controls['userType'].setValue(data[i].UserTypeId);
                this.myForm.controls['company'].setValue(data[i].CompanyId);
                this.myForm.controls['active'].setValue(data[i].IsActive);
              }
            }
          }, (error) => {

          }
        );
      }


    });


  }

  onSubmit(formD) {
    this.Loader = true;
    let formValues = formD.value;
    let bodyObj = {
      "UserId": this.userId,
      "Name": formValues.name,
      "EmailId": formValues.email,
      "Password": formValues.password,
      "UserTypeId": formValues.userType,
      "CompanyId": formValues.company,
      "SurveyorsId": 2,
      "IsActive": formValues.active
    };

    this.userService.addUser(bodyObj).subscribe(
      result => {
        // Handle result
        this.showSuccess = true;
        this.successMessage = result.Message;
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.router.navigate(['/users']);
        }, 2000);
        this.Loader = false;
      },
      error => {
        this.showError = true;
        this.errorMessage = error.Message;
        this.Loader = false;
      },
      () => {
        // No errors, route to new page
      }
    );

  }
}
