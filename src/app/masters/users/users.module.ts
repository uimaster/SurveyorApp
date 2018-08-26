import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRouteModule } from './users.route.module';
import { CreateUsersComponent } from './create/create.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { SharedModule } from './../../sharedModule/shared.module';
import { MaterialModule } from '../../material.module';
@NgModule({
  imports: [
    CommonModule,
    UsersRouteModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [ UsersComponent, CreateUsersComponent],
  providers: [ UsersService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UsersModule { }
