import { Component, OnInit } from '@angular/core';
import {UsersService} from "./users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public TotalDada = [];
  constructor( private userService: UsersService, private router:Router){}

  getUserList() {
    this.userService.getUsersList()
      .subscribe(res =>{
        this.TotalDada = res;
      });
  }


  ngOnInit(){
    this.getUserList();
  }

  editUser(UserId){
    this.router.navigate(['/users/create/' + UserId]);
  }

}
