import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class RoleGuard implements CanActivate {
    constructor(private teacherAuth: TeacherAuthService,
        private router: Router, private _snackbar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let url: string = state.url;
        return this.checkUserLogin(route, url)
        // if(this.teacherAuth.currentUser.role === 'Admin')
        // return true;
        // else
        // this._snackbar.open("Access denied, You do not have that role to access.", "Ok", {
        //     duration: 5000,
        //     panelClass: ['blue-snackbar']
        // });
        // this.router.navigate(['/home']);
        // return false;

    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.teacherAuth.isLoggedIn()) {
            const userRole = this.teacherAuth.getRoleAdmin()
            if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
                this._snackbar.open("Access denied, You do not have that role to access.", "Ok", {
                    duration: 5000,
                    panelClass: ['red-snackbar']
                });
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}  