import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private teacherAuth: TeacherAuthService,
        private router: Router, private _snackbar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.teacherAuth.isLoggedIn();
        if (!isAuth) {
            this._snackbar.open("Access denied, Please Login to continue.", "Ok", {
                duration: 5000,
                panelClass: ['red-snackbar']
            });
            this.router.navigate(['/authenticate/login'], {queryParams: {returnUrl: state.url}});
        }
        return isAuth;
    }
}  