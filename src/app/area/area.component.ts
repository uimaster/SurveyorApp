import { Component, OnInit } from '@angular/core';
import {AreaService} from "./area.service";
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  providers: [AreaService]
})
export class AreaComponent implements OnInit {

  public TotalDada = [];
  constructor( private areaService: AreaService){}

  getAreaList() {
    this.areaService.getAreaList()
      .subscribe(res =>{
        this.TotalDada = res.Data;
      });
  }


  ngOnInit(){
    this.getAreaList();
  }

}
