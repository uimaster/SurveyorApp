import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreCattleRouteModule } from './pre-wizard.route.module';
import { PreWizardComponent } from './pre-wizard.component';
import { SharedModule } from '../../sharedModule/shared.module';
import { MaterialModule } from './../../material.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PreCattleRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ PreWizardComponent]
})
export class PreCattleModule { }
