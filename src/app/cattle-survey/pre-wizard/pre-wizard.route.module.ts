import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreWizardComponent } from './pre-wizard.component';

export const routes: Routes = [
  { path: '',  component: PreWizardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class PreCattleRouteModule { }
