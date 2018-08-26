import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyorComponent } from './surveyor.component';
import { CreateSurveyorComponent } from './create-surveyor/create-surveyor.component';
export const routes: Routes = [
  { path: '',  component: SurveyorComponent},
  { path: 'surveyor/create/:id', component: CreateSurveyorComponent },
  { path: 'surveyor/create', component: CreateSurveyorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class SurveyorRouteModule { }
