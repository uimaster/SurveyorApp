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
  Loader = true;
  isDeleteModal = false;
  deleteSurveyorId = '';
  constructor( private surveyorService: SurveyorService,  private router:Router ){}

  getSurveyorList() {
    this.surveyorService.getSurveyorList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
        this.Loader = false;
      });
  }


  ngOnInit() {
    this.getSurveyorList();
  }

  editSurveyor(surveyorId){
    this.router.navigate(['/surveyor/' + surveyorId]);
  }

  openDeleteModal(id) {
    this.isDeleteModal = true;
    this.deleteSurveyorId = id;
    console.log(this.deleteSurveyorId);
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteUser(id) {
    this.surveyorService.deleteSurveyor(id).subscribe( res => {
      if (res && res.Status === '200') {
        alert('You have successfully delete the case.');
        this.closeDeleteModal();
        window.location.reload();
      } else {
        alert(res.Message);
      }
    });
  }

}
