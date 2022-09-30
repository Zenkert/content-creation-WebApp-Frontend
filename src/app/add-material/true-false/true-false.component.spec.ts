import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseComponent } from './true-false.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('TrueFalseComponent', () => {
  let component: TrueFalseComponent;
  let fixture: ComponentFixture<TrueFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrueFalseComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
