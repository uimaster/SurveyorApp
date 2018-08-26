import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users/users.service";
import {SurveyorService} from "./surveyor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-surveyor',
  templateUrl: './surveyor.component.html',
  styleUrls: ['./surveyor.component.css'],
  providers: [SurveyorService]
})
export class SurveyorComponent implements OnInit {
  public TotalDada = [];
  Loader: boolean = true;
  constructor( private surveyorService: SurveyorService,  private router:Router ){}

  getSurveyorList() {
    this.surveyorService.getSurveyorList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
        this.Loader = false;
      });
  }


  ngOnInit(){
    this.getSurveyorList();
  }

  editSurveyor(surveyorId){
    this.router.navigate(['/surveyor/create/' + surveyorId]);
  }

}
