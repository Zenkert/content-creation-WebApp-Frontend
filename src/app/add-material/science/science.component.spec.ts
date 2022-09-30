import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceComponent } from './science.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('ScienceComponent', () => {
  let component: ScienceComponent;
  let fixture: ComponentFixture<ScienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
