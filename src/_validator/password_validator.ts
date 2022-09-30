import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup
} from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

// // custom validator to check that two fields match
// export function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];
//     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//       // return if another validator has already found an error on the matchingControl
//       return;
//     }
//     // set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mustMatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   }
// }


export class CustomValidators {
  constructor() { }
  static checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('psw_repeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  // static oldPasswordValidator(control: AbstractControl)
}
