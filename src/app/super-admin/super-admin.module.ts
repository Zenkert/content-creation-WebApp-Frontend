import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperProfileComponent } from './super-profile/super-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SuperProfileComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MatSnackBarModule
  ]
})
export class SuperAdminModule { }
