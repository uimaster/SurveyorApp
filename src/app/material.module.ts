import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatSelectModule, MatRadioModule, MatDatepickerModule,
  MatNativeDateModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatInputModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  exports: [
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
    MatSelectModule,
    MatInputModule,
  ]
})

export class MaterialModule {}
