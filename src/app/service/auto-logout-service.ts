import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

const STORE_KEY =  'lastAction';
@Injectable()
export class AutoLogoutService {
 public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private _snackBar: MatSnackBar) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
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
    const timeleft = this.getLastAction() + 1 * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout)  {
        localStorage.removeItem('id');
        localStorage.removeItem('lastAction');
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');   
        setTimeout(() => {
            console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        }, 10000);
        this._snackBar.open("Your Session Expired due to longer Inactivity, Login Again To Continue", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
        })   
        this.router.navigate(['/authenticate/login']);
    }
  }
}