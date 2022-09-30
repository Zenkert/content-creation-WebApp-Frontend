import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { RoleGuard } from 'src/_validator/_auth/role-guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminComponent } from './admin/admin.component';
import { ViewTopicListComponent } from './view-topic-list/view-topic-list.component';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin'}
  },
  {
    path: 'profile', component: AdminProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }
  },
  {
    path: 'viewTopics', component: ViewTopicListComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }
  },
  {
    path: 'view-users', component: ViewUserListComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]

})
export class AdminModuleRoutingModule { }
