import { Routes, RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';

import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { WizardComponent } from './vehicle-survey/spot-wizard/wizard';
import { PreWizardComponent } from './vehicle-survey/pre-wizard/wizard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'pre-wizard', component: PreWizardComponent },
  { path: 'pre-cattle', loadChildren: 'app/cattle-survey/pre-wizard/pre-wizard.module#PreCattleModule'},
  { path: 'spot-cattle', loadChildren: 'app/cattle-survey/spot-wizard/spot-wizard.module#SpotCattleModule'},
  { path: 'users', loadChildren: 'app/masters/users/users.module#UsersModule'},
  { path: 'surveyor', loadChildren: 'app/masters/surveyor/surveyor.module#SurveyorModule' },
  { path: 'area', loadChildren: 'app/masters/area/area.module#AreaModule' },
  { path: 'companies', loadChildren: 'app/masters/companies/company.module#CompanyModule' },
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})

export class AppRouteModule {}
