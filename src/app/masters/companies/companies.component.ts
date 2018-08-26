import { Component, OnInit } from '@angular/core';
import {AreaService} from "../area/area.service";
import {CompaniesService} from "./companies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers:[CompaniesService]
})
export class CompaniesComponent implements OnInit {

  public TotalDada = [];
  Loader: boolean = true;
  constructor( private companyService: CompaniesService,private router:Router){}

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
        this.Loader = false;
      });
  }


  ngOnInit(){
    this.getCompanyList();
  }

  editCompany(companyId){
    this.router.navigate(['/companies/create/' + companyId]);
  }

}
