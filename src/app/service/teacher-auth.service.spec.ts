import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../authenticate/login/login.component';
import { RegisterComponent } from '../authenticate/register/register.component';

import { TeacherAuthService } from './teacher-auth.service';

describe('TeacherAuthService', () => {
  let service: TeacherAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, RegisterComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ TeacherAuthService ]
    });
    service = TestBed.inject(TeacherAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
