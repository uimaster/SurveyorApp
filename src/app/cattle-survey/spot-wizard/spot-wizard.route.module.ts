import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotWizardComponent } from './spot-wizard.component';

export const routes: Routes = [
  { path: '',  component: SpotWizardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class SpotCattleRouteModule { }
