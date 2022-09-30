import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../angular_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ViewTopicsComponent } from './view-topics/view-topics.component';
import { ViewAllTopicsComponent } from './view-all-topics/view-all-topics.component';
import { TranslateModule } from '@ngx-translate/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogueComponent } from './mat-confirm-dialogue/mat-confirm-dialogue.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AddMaterialComponent,
    ViewTopicsComponent,
    ViewAllTopicsComponent,
    EditProfileComponent,
    MatConfirmDialogueComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class UserProfileModule { }
