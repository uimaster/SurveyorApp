import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { routing } from './app.route';
import { SidebarComponent} from './sidebar/sidebar';
import { HeaderComponent } from './header/header';
import { WizardComponent } from './wizard/wizard';
import { DashboardTabComponent } from './dashboard/dashboardTabs/tabs';
import { ProcessCaseComponent } from './dashboard/processCases/processCase';

// Providers
import { LoginService } from '../app/login/login.service';
import { TabsService } from './dashboard/dashboardTabs/tabs.service';
import { WizardService } from './wizard/wizard.service';

//Material Modules
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
import { UsersComponent } from './users/users.component';
import { SurveyorComponent } from './surveyor/surveyor.component';
import { AreaComponent } from './area/area.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersService } from "./users/users.service";
import { CreateComponent } from './users/create/create.component';
import { CreateSurveyorComponent } from './surveyor/create-surveyor/create-surveyor.component';
import { CreateAreaComponent } from './area/create-area/create-area.component';
import { CreateCompaniesComponent } from './companies/create-companies/create-companies.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    WizardComponent,
    DashboardTabComponent,
    ProcessCaseComponent,
    UsersComponent,
    SurveyorComponent,
    AreaComponent,
    CompaniesComponent,
    CreateComponent,
    CreateSurveyorComponent,
    CreateAreaComponent,
    CreateCompaniesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatNativeDateModule
  ],
  providers: [LoginService, TabsService, WizardService,UsersService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
