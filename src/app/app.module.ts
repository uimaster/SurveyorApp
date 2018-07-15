import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { routing } from './app.route';
import { SidebarComponent} from './sidebar/sidebar';
import { HeaderComponent } from './header/header';
import { WizardComponent } from './wizard/wizard';
import { DashboardTabComponent } from './dashboard/dashboardTabs/tabs';

// Providers
import { LoginService } from '../app/login/login.service';
import { TabsService } from './dashboard/dashboardTabs/tabs.service';
import { WizardService } from './wizard/wizard.service';

// Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE, MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { MatGridListModule } from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { UsersComponent } from './users/users.component';
import { SurveyorComponent } from './surveyor/surveyor.component';
import { AreaComponent } from './area/area.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersService } from './users/users.service';
import { AreaService } from './area/area.service';
import { CreateComponent } from './users/create/create.component';
import { CreateSurveyorComponent } from './surveyor/create-surveyor/create-surveyor.component';
import { CreateAreaComponent } from './area/create-area/create-area.component';
import { CreateCompaniesComponent } from './companies/create-companies/create-companies.component';
import { PreWizardComponent } from './wizardPre/wizard';
import { PreWizardService } from './wizardPre/wizard.service';
import {CompaniesService} from './companies/companies.service';
import {DashboardService} from './dashboard/dashboard.service';
import { SurveyorService } from './surveyor/surveyor.service';

import { SharedModule } from './sharedModule/shared.module';
import { DashboardSearchPipe } from '../shared/pipes/dashboard-search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    WizardComponent,
    DashboardTabComponent,
    UsersComponent,
    SurveyorComponent,
    AreaComponent,
    CompaniesComponent,
    CreateComponent,
    CreateSurveyorComponent,
    CreateAreaComponent,
    CreateCompaniesComponent,
    PreWizardComponent,
    DashboardSearchPipe,
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    //Material Modules
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [LoginService, TabsService, DashboardService, SurveyorService, WizardService, UsersService, CompaniesService, AreaService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, PreWizardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
