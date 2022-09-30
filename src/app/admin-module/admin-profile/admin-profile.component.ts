import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(private teacherService: TeacherAuthService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.teacherService.onLogout()
  }
}
