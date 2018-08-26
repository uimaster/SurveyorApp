import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotWizardComponent } from './spot-wizard.component';
import { SpotCattleRouteModule } from './spot-wizard.route.module';
import { SharedModule } from '../../sharedModule/shared.module';
import { MaterialModule } from '../../material.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpotCattleRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ SpotWizardComponent ]
})
export class SpotCattleModule { }
