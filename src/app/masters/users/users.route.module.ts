import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { CreateUsersComponent } from './create/create.component';

export const routes: Routes = [
  { path: '',  component: UsersComponent},
  { path: 'users/create/:id', component: CreateUsersComponent },
  { path: 'users/create', component: CreateUsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class UsersRouteModule { }
