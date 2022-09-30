import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { APPErrors } from 'src/_Error-handler/appError';
import { NotFoundError } from 'src/_Error-handler/notFoundError';
import { UnauthorizedErrors } from 'src/_Error-handler/unauthorizedErrors';
const STORE_KEY = 'lastAction';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("",
      [Validators.required])
  });

  hide = true;
  loading: boolean

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private teacherService: TeacherAuthService,
    private _snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY, Date.now().toString());
  }
  ngOnInit(): void { }

  onSubmit() {
    this.loading = true
    this.teacherService.loginUser(this.loginForm.value, true)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('id', res.user._id);
          localStorage.setItem("isLoggedIn", "true");
          console.log(res)
          this._snackBar.open("You have logged in successfully", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loading = false;
          this.loginForm.reset();
          if (res.user.role === 'Admin') {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
            return this.router.navigate([returnUrl || '/adminUser/profile']);
          }
          else {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
            return this.router.navigate([returnUrl || `/user/profile`])
          };
        },
        (err: APPErrors) => {
          if (err instanceof NotFoundError) {
            this._snackBar.open("No user associated with this email", "Ok", {
              duration: 5000,
              panelClass: ['red-snackbar']
            });
            this.loading = false
          }
          else if (err instanceof UnauthorizedErrors) {
            this._snackBar.open("Incorrect Email or Password", "Ok", {
              duration: 5000,
              panelClass: ['red-snackbar']
            });
            this.loading = false
          }
          else throw err;
        })
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, 1000);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + 1440 * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      localStorage.removeItem('id');
      localStorage.removeItem('lastAction');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', 'false');
      this._snackBar.open("Your Session Expired due to longer Inactivity, Login again To Continue", "Ok", {
        duration: 5000,
        panelClass: ['blue-snackbar']
      })
      this.router.navigate(['/authenticate/login']);
    }
  }
}





   // if (res.user.isVerified == true) {
          //   localStorage.setItem('token', res.token);
          //   localStorage.setItem('name', res.user.name);
          //   localStorage.setItem('id', res.user._id);
          //   localStorage.setItem("isLoggedIn", "true");

          //   this._snackBar.open("You have logged in successfully", "Ok", {
          //     duration: 5000,
          //     panelClass: ['blue-snackbar']
          //   });
          //   this.loginForm.reset();
          //   this.router.navigate(['/user/profile']);
          // }
          // else {
          //   this._snackBar.open("Please verify your email first", "Ok", {
          //     duration: 5000,
          //     panelClass: ['blue-snackbar']
          //   });
          // }