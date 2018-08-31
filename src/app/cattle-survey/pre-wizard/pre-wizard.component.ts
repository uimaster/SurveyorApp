import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, } from '@angular/core';

@Component({
  selector: 'app-pre-wizard',
  templateUrl: './pre-wizard.component.html',
  styleUrls: ['./pre-wizard.component.scss']
})
export class PreWizardComponent implements OnInit {
  isLinear = false;
  caseNo = localStorage.getItem('CaseNO');
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

  }

}
