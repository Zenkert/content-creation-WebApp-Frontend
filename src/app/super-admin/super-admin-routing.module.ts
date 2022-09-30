import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { RoleGuard } from 'src/_validator/_auth/role-guard';
import { SuperProfileComponent } from './super-profile/super-profile.component';

const routes: Routes = [
  {
    path: 'profile', component: SuperProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'SuperAdmin' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]

})
export class SuperAdminRoutingModule { }
