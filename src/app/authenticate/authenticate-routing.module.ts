import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { CanDeactivateGuard } from 'src/_validator/_auth/deactive-guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'resetPassword/:userId/:token', component: ResetPasswordComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'verify/:token', component: VerifyComponent },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard]

})
export class AuthenticateRoutingModule { }
