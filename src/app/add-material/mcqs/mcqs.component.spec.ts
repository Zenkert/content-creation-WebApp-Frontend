import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCQSComponent } from './mcqs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('MCQSComponent', () => {
  let component: MCQSComponent;
  let fixture: ComponentFixture<MCQSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCQSComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
        })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCQSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
