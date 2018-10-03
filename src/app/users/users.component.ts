import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public TotalDada = [];
  Loader = true;
  public searchText = '';
  isDeleteModal = false;
  deleteUserId = '';
  constructor( private userService: UsersService, private router: Router) {}

  getUserList() {
    this.userService.getUsersList()
      .subscribe(res => {
        if (res && res.Status === '200') {
          this.TotalDada = res.Data;
          this.Loader = false;
        }
      });
  }

  ngOnInit() {
    this.getUserList();
  }

  editUser(UserId) {
    this.router.navigate(['/users/' + UserId]);
  }

  openDeleteModal(id) {
    this.isDeleteModal = true;
    this.deleteUserId = id;
    console.log(this.deleteUserId);
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe( res => {
      if (res && res.Status === '200') {
        alert('You have successfully delete the case.');
        window.location.reload();
      } else {
        alert(res.Message);
      }
    });
  }

}
