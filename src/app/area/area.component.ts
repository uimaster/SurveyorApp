import { Component, OnInit } from '@angular/core';
import {AreaService} from "./area.service";
import {UsersService} from "../users/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  providers: [AreaService]
})
export class AreaComponent implements OnInit {

  public TotalDada = [];
  Loader: boolean = true;
  constructor( private areaService: AreaService,private router:Router){}

  getAreaList() {
    this.areaService.getAreaList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
        this.Loader = false;
      });
  }


  ngOnInit(){
    this.getAreaList();
  }

  editArea(AreaId){
    this.router.navigate(['/area/create/' + AreaId]);
  }

}
