import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { WizardComponent } from '../app/wizard/wizard';
import { ProcessCaseComponent } from './dashboard/processCases/processCase';
import {UsersComponent} from "./users/users.component";
import {SurveyorComponent} from "./surveyor/surveyor.component";
import {AreaComponent} from "./area/area.component";
import {CompaniesComponent} from "./companies/companies.component";

export const routes: Routes = [
    { path:'', redirectTo:'login', pathMatch: 'full'},
    { path:'login', component: LoginComponent },
    { path:'dashboard', component: DashboardComponent },
    { path:'wizard', component: WizardComponent },
    { path:'process-case', component:ProcessCaseComponent},
    { path:'users', component:UsersComponent},
    { path:'surveyor', component:SurveyorComponent},
    { path:'area', component:AreaComponent},
  { path:'companies', component:CompaniesComponent},
    {path: '**', component: LoginComponent}
]

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);
