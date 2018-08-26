import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';

export const routes: Routes = [
  { path: '',  component: CompaniesComponent},
  { path: 'companies/create/:id', component: CreateCompaniesComponent },
  { path: 'companies/create', component: CreateCompaniesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class CompanyRouteModule { }
