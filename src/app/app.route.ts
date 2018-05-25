import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { WizardComponent } from '../app/wizard/wizard';
import { ProcessCaseComponent } from './dashboard/processCases/processCase';

export const routes: Routes = [
    { path:'', redirectTo:'login', pathMatch: 'full'},
    { path:'login', component: LoginComponent },
    { path:'dashboard', component: DashboardComponent },
    { path:'wizard', component: WizardComponent },
    { path:'process-case', component:ProcessCaseComponent},
    {path: '**', component: LoginComponent}
]

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);