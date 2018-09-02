import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { AppRouteModule } from './app.route.module';
import { WizardComponent } from './vehicle-survey/spot-wizard/wizard';
import { DashboardTabComponent } from './dashboard/dashboardTabs/tabs';

// Providers
import { LoginService } from '../app/login/login.service';
import { TabsService } from './dashboard/dashboardTabs/tabs.service';
import { WizardService } from './vehicle-survey/spot-wizard/wizard.service';

// Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE} from '@angular/material';

import { PreWizardComponent } from './vehicle-survey/pre-wizard/wizard';
import { PreWizardService } from './vehicle-survey/pre-wizard/wizard.service';
import { DashboardService} from './dashboard/dashboard.service';

import { SharedModule } from './sharedModule/shared.module';
import { RequestInterceptor } from '../app/login/login.inteceptor';
import { CommonImageComponent } from './sharedModule/images.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    WizardComponent,
    DashboardTabComponent,
    PreWizardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AppRouteModule
  ],
  providers: [LoginService, TabsService, DashboardService, WizardService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, PreWizardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    CommonImageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
