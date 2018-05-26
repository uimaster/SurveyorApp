import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users/users.service";
import {SurveyorService} from "./surveyor.service";

@Component({
  selector: 'app-surveyor',
  templateUrl: './surveyor.component.html',
  styleUrls: ['./surveyor.component.css'],
  providers: [SurveyorService]
})
export class SurveyorComponent implements OnInit {
  public TotalDada = [];
  constructor( private surveyorService: SurveyorService){}

  getSurveyorList() {
    this.surveyorService.getSurveyorList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
      });
  }


  ngOnInit(){
    this.getSurveyorList();
  }

}
