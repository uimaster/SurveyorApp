import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AreaService} from "../area.service";

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.css'],
  providers: [AreaService]
})
export class CreateAreaComponent implements OnInit {

  public myForm: FormGroup;
  public successMessage:String;
  public errorMessage:String;
  public showError: boolean=false;
  public showSuccess: boolean=false;
  public sub: Subscription;
  public areaId:Number = 0;

  constructor(private fb: FormBuilder, private areaService: AreaService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      name: ['', Validators.required]

    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.areaId = params['id'];

      if(this.areaId > 0){
        this.areaService.getAreaList().subscribe((data)=> {
            const finalData = data.Data;
            for (let i = 0; i < finalData.length;  i++) {
              if (finalData[i].AreaId == this.areaId) {
                this.myForm.controls['name'].setValue(finalData[i].AreaName);
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
      "AreaId":this.areaId,
      "AreaName":formD.name
    };

    this.areaService.addArea(bodyObj).subscribe (
      result => {
        // Handle result
        console.log(result);
        this.showSuccess = true;
        this.successMessage = result.Message;
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.router.navigate(['/area']);
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
