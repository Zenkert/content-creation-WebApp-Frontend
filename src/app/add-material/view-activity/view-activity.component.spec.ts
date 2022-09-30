import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityComponent } from './view-activity.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { TopicsService } from 'src/app/service/topics.service';
import { Observable, from } from 'rxjs';

describe('ViewActivityComponent', () => {
  let component: ViewActivityComponent;
  let fixture: ComponentFixture<ViewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActivityComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  // Mock service 
  beforeEach(() => {
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Should delete open ended question', () => {
  //   spyOn(OpenEndedservice, 'delete').and.
  //   component.ngOnInit()
  //   expect(component.onDeleteOpenEnded).toHaveBeenCalledTimes(1)
  // })
});
