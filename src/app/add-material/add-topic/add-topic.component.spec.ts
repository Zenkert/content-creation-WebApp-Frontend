import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicComponent } from './add-topic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { Observable, from } from 'rxjs';

describe('AddTopicComponent', () => {
  let component: AddTopicComponent;
  let fixture: ComponentFixture<AddTopicComponent>;
  let service: ActivityFormService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        TranslateModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    service = new ActivityFormService(null);
    // component = new AddTopicComponent(service)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should return the array of age group', () => {
  //   let language = [1,2,3]
  //   spyOn(service, 'getAllLanguage').and.callFake(() => {
  //     return from([[1,2,3]])
  //   })
  //   // component.ngOnInit()
  //   expect(component.language).toBeGreaterThan(2)
  // })
});
