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
  public showSuccessMessage: boolean = false;
  public showErrorMessage : boolean = false;
  public isLoggedIn: any = false;
  loginData = {};
  constructor( private loginservice: LoginService, private router: Router){

    this.loginForm = new FormGroup({
      UserName : new FormControl('', Validators.required),
      UserPassword : new FormControl('', Validators.required)
    })  
  }

  loginSubmit(data){
    debugger;
    if(this.loginForm.valid){     
      this.loginservice.loginSubmit(this.loginForm.value)
        .subscribe(res =>{
          if(res && res.Status == 200){
            this.loginData = res.Data;
            console.log(this.loginData);
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
            localStorage.setItem('SurveyorsId', JSON.stringify(this.loginData[0].SurveyorsId));
            localStorage.setItem('CompanyId', JSON.stringify(this.loginData[0].CompanyId));
            this.loginSuccessMessage = res.massage;
            this.showSuccessMessage = true;
            this.showErrorMessage = false;
            setTimeout(() => { 
            this.router.navigate(['/dashboard']);
            },2000);
          }
          else{
            this.loginfailedMessage = res.massage;
            this.showSuccessMessage = false;
            this.showErrorMessage = true;
          }
        })
    }
  }

  ngOnInit(){  
  }

}