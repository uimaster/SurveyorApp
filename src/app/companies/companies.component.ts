import { Component, OnInit } from '@angular/core';
import {AreaService} from "../area/area.service";
import {CompaniesService} from "./companies.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers:[CompaniesService]
})
export class CompaniesComponent implements OnInit {

  public TotalDada = [];
  constructor( private companyService: CompaniesService){}

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
      });
  }


  ngOnInit(){
    this.getCompanyList();
  }

}
