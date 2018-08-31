import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreCattleRouteModule } from './pre-wizard.route.module';
import { PreWizardComponent } from './pre-wizard.component';
import { SharedModule } from '../../sharedModule/shared.module';
import { MaterialModule } from './../../material.module';
import { ClaimComponent } from './claim/claim.component';
import { DescriptionComponent } from './description/description.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { AnimalImagesComponent } from './animal-images/animal-images.component';
import { MultiImagesComponent } from './multi-images/multi-images.component';
import { SignatureComponent } from './signature/signature.component';
import { PreCattleService } from '../pre-wizard/pre-wizard.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PreCattleRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [
    PreWizardComponent,
    ClaimComponent,
    DescriptionComponent,
    OtherInfoComponent,
    AnimalImagesComponent,
    MultiImagesComponent,
    SignatureComponent],
  providers: [
    PreCattleService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreCattleModule { }
