import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyorComponent } from './surveyor.component';
import { CreateSurveyorComponent } from './create-surveyor/create-surveyor.component';
import { SharedModule } from '../sharedModule/shared.module';
import { SurveyorRouteModule } from './surveyor.route.module';
import { SurveyorService } from './surveyor.service';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    SurveyorRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ SurveyorComponent, CreateSurveyorComponent],
  providers: [ SurveyorService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SurveyorModule { }
