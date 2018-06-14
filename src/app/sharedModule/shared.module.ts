import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DATE_LOCALE, MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

import { SharedModuleServices } from './shared.service';
import { SharedComponent, DonwloadDialog } from './shared.component';

@NgModule({
    declarations: [
        SharedComponent,
        DonwloadDialog
    ],
    imports: [
      BrowserModule,
      MatRadioModule,
      MatDialogModule,
      MatButtonModule,
      MatInputModule,
      ReactiveFormsModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [DonwloadDialog],
    exports: [
        SharedComponent,
        DonwloadDialog
    ],
    providers: [SharedModuleServices]
  })
  
  export class SharedModule {
  
    static forRoot() {
      return {
        ngModule: SharedModule,
        providers: [],
      };
    }
  
  }