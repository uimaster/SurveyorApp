import {Component} from '@angular/core';

@Component({
  selector: 'header-selector',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  userEmail = '';
  userName = '';
  constructor() {
    this.userEmail = JSON.parse(localStorage.getItem('userEmail'));
    this.userName = JSON.parse(localStorage.getItem('userName'));
  }
}
