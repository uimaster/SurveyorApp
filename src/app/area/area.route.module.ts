import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { CreateAreaComponent } from './create-area/create-area.component';
export const routes: Routes = [
  { path: '',  component: AreaComponent },
  { path: ':id', component: CreateAreaComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class AreaRouteModule { }
