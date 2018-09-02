import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { CompanyRouteModule } from './company.route.module';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';
import { CompaniesService } from './companies.service';
import { SharedModule } from '../sharedModule/shared.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    CompanyRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ CompaniesComponent, CreateCompaniesComponent],
  providers: [ CompaniesService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CompanyModule { }
