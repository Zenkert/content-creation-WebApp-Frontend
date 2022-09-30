import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'src/_validator/password_validator';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { AESEncryptDecryptServiceService } from '../../service/aesencrypt-decrypt-service.service'
import { SafeData } from 'src/app/_models/save-data-interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, SafeData {
  constructor(private teacherService: TeacherAuthService,
    private snackbar: MatSnackBar, private router: Router,
    private _AESEncryptDecryptService: AESEncryptDecryptServiceService) { }
    
  @HostListener('window:beforeunload', ['$event'])
  onBeforeReload(e: BeforeUnloadEvent) {
    e.stopPropagation();
    if (this.changeForm.dirty) {
      return (e.returnValue = 'Are you sure you want to exit?');
    }
    return true;
  }
  isDataSaved(): boolean {
    return this.changeForm.dirty;
  }

  ngOnInit(): void {
  }

  oldPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // console.log(control.value + ' naila')
      return this.teacherService.getUserById().pipe(
        map((res) => {
          console.log(res + 'i am res')
          // let encryptedText = _self._AESEncryptDecryptService.encrypt("Hello World");
          let decryptedPassword = this._AESEncryptDecryptService.decrypt(res.data.password).toString();
          let resPassword: string = decryptedPassword;
          let inputPassword: string = control.value;
          console.log('naila' + resPassword)
          console.log('ahmed' + inputPassword)
          return (resPassword === inputPassword ? { passwordMatch: true } : null)
        }),
        catchError((err) => { console.log(err + 'i am error'); return null })
      )
    }
  }

  getuser() {
    console.log('i am res')
    this.teacherService.getUserById().subscribe(data => {
      console.log(data)
    })
  }
  // getuser() {
  //   console.log('i am res')
  //   this.teacherService.getUserById().pipe(
  //     map((res => {
  //       console.log(res)
  //     }))
  //   )
  // }

  public changeForm: FormGroup = new FormGroup({
    oldPassword: new FormControl("", [
      Validators.required
    ]),
    // oldPassword: new FormControl('', {
    //   validators: [Validators.required],
    //   asyncValidators: this.oldPasswordValidator(),
    //   updateOn: 'blur',
    // }),
    password: new FormControl("",
      [Validators.required, Validators.minLength(8)]),

    psw_repeat: new FormControl("",
      [Validators.required])
  }, { validators: CustomValidators.checkPasswords }
  );

  get oldPassword() { return this.changeForm.get('oldPassword'); }
  get password() { return this.changeForm.get('password'); }
  get psw_repeat() { return this.changeForm.get('psw_repeat'); }

  onSubmit() {
    this.teacherService.changePassword(this.changeForm.value)
      .subscribe(
        data => {
          this.snackbar.open('Your password has been changed', 'Ok', {
            duration: 5000,
            panelClass: ['blue-snackbar']
          })
          this.router.navigate(['/user/profile'])
          this.changeForm.reset();
          console.log(data)
        },
        err => {
          this.snackbar.open('Your old password is incorrect', 'Ok', {
            duration: 5000,
            panelClass: ['red-snackbar']
          })
          console.log(err)
        })
  }
  hide = true;

}
