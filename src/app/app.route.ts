import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { WizardComponent } from '../app/wizard/wizard';
import { PreWizardComponent } from './wizardPre/wizard';
import { UsersComponent } from "./users/users.component";
import { SurveyorComponent } from "./surveyor/surveyor.component";
import { AreaComponent } from "./area/area.component";
import { CompaniesComponent } from "./companies/companies.component";
import { CreateComponent } from "./users/create/create.component";
import { CreateSurveyorComponent } from "./surveyor/create-surveyor/create-surveyor.component";
import { CreateAreaComponent } from "./area/create-area/create-area.component";
import { CreateCompaniesComponent } from "./companies/create-companies/create-companies.component";


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'pre-wizard', component: PreWizardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create/:id', component: CreateComponent },
  { path: 'users/create', component: CreateComponent },

  { path: 'surveyor', component: SurveyorComponent },
  { path: 'surveyor/create/:id', component: CreateSurveyorComponent },
  { path: 'surveyor/create', component: CreateSurveyorComponent },
  { path: 'area', component: AreaComponent },
  { path: 'area/create/:id', component: CreateAreaComponent },
  { path: 'area/create', component: CreateAreaComponent },

  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/create/:id', component: CreateCompaniesComponent },
  { path: 'companies/create', component: CreateCompaniesComponent },
  { path: '**', component: LoginComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
