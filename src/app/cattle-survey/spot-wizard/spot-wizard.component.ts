import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spot-wizard',
  templateUrl: './spot-wizard.component.html',
  styleUrls: ['./spot-wizard.component.scss']
})
export class SpotWizardComponent implements OnInit {
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

  }
}
