import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { RoleGuard } from 'src/_validator/_auth/role-guard';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAllTopicsComponent } from './view-all-topics/view-all-topics.component';
import { ViewTopicsComponent } from './view-topics/view-topics.component';

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'User' }
  },
  { path: 'add', component: AddMaterialComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewTopicsComponent, canActivate: [AuthGuard] },
  { path: 'viewAll', component: ViewAllTopicsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]

})
export class UserProfileRoutingModule { }
