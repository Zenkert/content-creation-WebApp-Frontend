import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicsComponent } from './view-topics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('ViewTopicsComponent', () => {
  let component: ViewTopicsComponent;
  let fixture: ComponentFixture<ViewTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTopicsComponent ],
      imports: [HttpClientTestingModule, MatPaginatorModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot(), BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
