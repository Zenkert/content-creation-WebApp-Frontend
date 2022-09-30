import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEndedComponent } from './open-ended.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('OpenEndedComponent', () => {
  let component: OpenEndedComponent;
  let fixture: ComponentFixture<OpenEndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenEndedComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
