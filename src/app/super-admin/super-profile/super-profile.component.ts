import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
@Component({
  selector: 'app-super-profile',
  templateUrl: './super-profile.component.html',
  styleUrls: ['./super-profile.component.scss']
})
export class SuperProfileComponent implements OnInit {

  constructor(private teacherService: TeacherAuthService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.teacherService.onLogout()
  }
}
