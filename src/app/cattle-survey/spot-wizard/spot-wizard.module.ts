import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotWizardComponent } from './spot-wizard.component';
import { SpotCattleRouteModule } from './spot-wizard.route.module';
import { SharedModule } from '../../sharedModule/shared.module';
import { MaterialModule } from '../../material.module';

import { ClaimComponent } from './claim/claim.component';
import { InspectionComponent } from './inspection/inspection.component';
import { ProofComponent } from './proof/proof.component';
import { AnimalImagesComponent } from './animal-images/animal-images.component';
import { InquaryOneComponent } from './enquiry-one/enquiry-one.component';
import { InquarySecondComponent } from './enquiry-second/enquiry-second.component';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { SignatureComponent } from './signature/signature.component';
import { SpotCattleService } from './spot-wizard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpotCattleRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [
    SpotWizardComponent,
    ClaimComponent,
    InspectionComponent,
    ProofComponent,
    AnimalImagesComponent,
    InquaryOneComponent,
    InquarySecondComponent,
    ReportSummaryComponent,
    SignatureComponent
  ],
  providers: [ SpotCattleService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpotCattleModule { }
