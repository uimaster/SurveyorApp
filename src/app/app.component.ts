import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isLoggedIn: any = false;

  constructor(private router:Router){}

  ngOnInit(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    if((this.isLoggedIn!= null) && (this.isLoggedIn = true)){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
