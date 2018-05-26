import { Component, OnInit } from '@angular/core';
import {UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public TotalDada = [];
  constructor( private userService: UsersService){}

  getUserList() {
    this.userService.getUsersList()
      .subscribe(res =>{
        this.TotalDada = res;
      });
  }


  ngOnInit(){
    this.getUserList();
  }

}
