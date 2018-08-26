import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAreaComponent } from './create-area/create-area.component';
import { AreaRouteModule } from './area.route.module';
import { SharedModule } from '../../sharedModule/shared.module';
import { AreaService } from './area.service';
import { AreaComponent } from './area.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    AreaRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ AreaComponent, CreateAreaComponent],
  providers: [ AreaService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AreaModule { }
