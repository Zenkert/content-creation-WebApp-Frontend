import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../angular_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewTopicListComponent } from './view-topic-list/view-topic-list.component';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminProfileComponent,
    ViewTopicListComponent,
    ViewUserListComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    MatSnackBarModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModuleModule { }
