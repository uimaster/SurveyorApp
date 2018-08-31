import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-images',
  templateUrl: './multi-images.component.html',
  styleUrls: ['./multi-images.component.scss']
})
export class MultiImagesComponent implements OnInit {
  @Input() stepper: any;
  constructor() { }

  ngOnInit() {
  }

  next() {
    setTimeout(() => {
      this.stepper.next();
    }, 1000);
  }

}
