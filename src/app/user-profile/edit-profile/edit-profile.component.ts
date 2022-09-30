import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isDisabled = true;
  user: any;
	updatedUser: any;

	public updateForm: FormGroup = new FormGroup({
		name: new FormControl('', [
			Validators.required,
		]),
		email: new FormControl({ value: '', disabled: this.isDisabled }, [
			Validators.required,
		]),
	});
  constructor(private router: Router,
		private teacherService: TeacherAuthService,
		public global: GlobalService,
		private _snackBar: MatSnackBar) { 
      this.teacherService.getUserById().subscribe(
        res => {
          this.user = res;
          this.updateForm.patchValue({
            name: this.user.data.name,
            email: this.user.data.email
          })
          console.log(this.user.data)
        });
    }

  ngOnInit(): void {
  }

	updateUser() {
		let body = this.updateForm.value;
		this.teacherService.updateUser(body).subscribe(
			res => {
				this.updatedUser = res;
				localStorage.setItem('name', this.updatedUser.data.name);
				this.updateForm.patchValue({
					name: this.updatedUser.data.name,
					// email: this.updatedUser.data.email,
				})
				this.user = this.updateForm.value;
				console.log(this.user);
				this._snackBar.open(" You profile has been updated", "Ok", {
					duration: 5000,
					panelClass: ['blue-snackbar']
				});
				window.location.reload();
			},
			(err: any) => {
				this._snackBar.open("Failed to update account", "Ok", {
					duration: 5000,
					panelClass: ['red-snackbar']
				});
				this.router.navigate(['/user/profile']);
			});
	}
}
