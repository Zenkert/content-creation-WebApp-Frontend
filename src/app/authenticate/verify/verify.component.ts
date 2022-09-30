import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

enum EmailStatus {
  alreadyVerified,
  Failed,
  verified
}
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.alreadyVerified;

  constructor(private teacherService: TeacherAuthService, private http: HttpClient,
    private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    this.teacherService.verifyEmail(token)
      .subscribe(res => {
        console.log(res)
        this.emailStatus = EmailStatus.verified;
        this._snackBar.open('Verification successful, you can now login.', "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });

      }, err => {
        // debugger

        if (err?.error?.type === "already-verified")
          this.emailStatus = EmailStatus.alreadyVerified;
        else if (err?.error?.type === 'not-verified')
          this.emailStatus = EmailStatus.Failed
      })
  }
}
