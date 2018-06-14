import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CompaniesService} from "../companies.service";


@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css'],
  providers: [CompaniesService]
})
export class CreateCompaniesComponent implements OnInit {

  public myForm: FormGroup;
  public successMessage:String;
  public errorMessage:String;
  public showError: boolean=false;
  public showSuccess: boolean=false;
  public sub: Subscription;
  public companyId:Number = 0;
  Loader: boolean = true;

  constructor(private fb: FormBuilder, private companyService: CompaniesService, private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.Loader = false;
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]],
      Contact: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]],
      address: [''],
      CompanyNos: ['na'],
      CompanyTypeId: [1, Validators.required]

    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.companyId = params['id'];

      if(this.companyId > 0){
        this.companyService.getCompanyList().subscribe((data)=> {
            const finalData =  data.Data;

            for (let i = 0; i < finalData.length;  i++) {
              if (finalData[i].CompanyId == this.companyId) {
                this.myForm.controls['name'].setValue(finalData[i].Name);
                this.myForm.controls['Contact'].setValue(finalData[i].Contact);
                this.myForm.controls['address'].setValue(finalData[i].Address);
                this.myForm.controls['CompanyNos'].setValue(finalData[i].CompanyNos);
                this.myForm.controls['CompanyTypeId'].setValue(finalData[i].CompanyTypeId);
              }
            }
          },(error)=>{

          }
        );
      }


    });

  }



  onSubmit(formD) {
    this.Loader = true;
    let bodyObj = {
      "CompanyId":this.companyId,
      "Name":formD.name,
      "Address":formD.address,
      "Contact":formD.Contact,
      "CompanyNos":formD.CompanyNos,
      "CompanyTypeId":formD.CompanyTypeId,
    };

    this.companyService.addCompanies(bodyObj).subscribe (
      result => {
        this.showSuccess = true;
        this.successMessage = result.Message;
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.router.navigate(['/companies']);
        },2000);
        this.Loader = false;
      },
      error => {
        this.showError = true;
        this.errorMessage = error.Message;
      },
      () => {
        // No errors, route to new page
      }
    );

  }


}
