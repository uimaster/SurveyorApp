import { CommonModule } from '@angular/common';
import { DashboardSearchPipe } from './../../shared/pipes/dashboard-search.pipe';
import { HeaderComponent } from './../header/header';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModuleServices } from './shared.service';
import { SharedComponent, DonwloadDialog } from './shared.component';
import { SurveyorService } from '../masters/surveyor/surveyor.service';
import { AreaService } from '../masters/area/area.service';
import { CompaniesService } from '../masters/companies/companies.service';
import { UsersService } from './../masters/users/users.service';
import { SidebarComponent } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [
        SharedComponent,
        DonwloadDialog,
        HeaderComponent,
        SidebarComponent,
        DashboardSearchPipe
    ],
    imports: [
      CommonModule,
      RouterModule,
      MaterialModule,
      ReactiveFormsModule, FormsModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [DonwloadDialog],
    exports: [
        SharedComponent,
        DonwloadDialog,
        HeaderComponent,
        SidebarComponent,
        DashboardSearchPipe
    ],
    providers: [SharedModuleServices, UsersService, SurveyorService, AreaService, CompaniesService]
  })

  export class SharedModule {
    static forRoot() {
      return {
        ngModule: SharedModule,
        providers: [],
      };
    }
  }
