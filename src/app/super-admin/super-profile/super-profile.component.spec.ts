import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperProfileComponent } from './super-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SuperProfileComponent', () => {
  let component: SuperProfileComponent;
  let fixture: ComponentFixture<SuperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
