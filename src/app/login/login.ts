import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'login-selector',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  public loginSuccessMessage: string;
  public loginfailedMessage: string;
  public showSuccessMessage = false;
  public showErrorMessage  = false;
  public isLoggedIn: any = false;
  loginData = {};
  constructor( private loginservice: LoginService, private router: Router){

    this.loginForm = new FormGroup({
      UserName : new FormControl('',[Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      UserPassword : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  loginSubmit(data){
    if(this.loginForm.valid){
      this.loginservice.loginSubmit(this.loginForm.value)
        .subscribe(res =>{
          if(res && res.Status == 200){
            this.loginData = res.Data;
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
            localStorage.setItem('SurveyorsId', JSON.stringify(this.loginData[0].SurveyorsId));
            localStorage.setItem('CompanyId', JSON.stringify(this.loginData[0].CompanyId));
            localStorage.setItem('userEmail', JSON.stringify(this.loginData[0].EmailId));
            localStorage.setItem('userName', JSON.stringify(this.loginData[0].Name));
            localStorage.setItem('UserTypeId', JSON.stringify(this.loginData[0].UserTypeId));
            localStorage.setItem('UserId', JSON.stringify(this.loginData[0].UserId));
            this.loginSuccessMessage = res.Message;
            this.showSuccessMessage = true;
            this.showErrorMessage = false;
            setTimeout(() => {
            this.router.navigate(['/dashboard']);
            }, 2000);
          } else {
            this.loginfailedMessage = res.Message;
            this.showSuccessMessage = false;
            this.showErrorMessage = true;
          }
        })
    }
  }

  ngOnInit(){
  }

}
