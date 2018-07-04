import {Component, OnInit} from '@angular/core';

/**
 * @title Basic cards
 */
@Component({
  selector: 'sidebar-selector',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent implements OnInit {
    showFiller = false;

    adminMenus = false;
    userTypeId: number;

    logOut() {
      localStorage.clear();
    }

    ngOnInit() {
      this.userTypeId = JSON.parse(localStorage.getItem('UserTypeId'));
      if(this.userTypeId === 1) {
        this.adminMenus = true;
      }
      else{
        this.adminMenus = false;
      }
    }
}
