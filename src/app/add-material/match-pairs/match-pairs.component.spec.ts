import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPairsComponent } from './match-pairs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('MatchPairsComponent', () => {
  let component: MatchPairsComponent;
  let fixture: ComponentFixture<MatchPairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPairsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
