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

    adminMenus: boolean = false;
    username:string = '';

    logOut(){
      localStorage.clear();
    }

    ngOnInit(){
      this.username = JSON.parse(localStorage.getItem('userName'));
      if(this.username==='Admin'){
        this.adminMenus = true;
      }
      else{
        this.adminMenus = false;
      }
    }
}
