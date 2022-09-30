import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ViewAllTopicsComponent } from './view-all-topics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicsService } from 'src/app/service/topics.service';
import { from, Observable } from 'rxjs';
import { from as observableFrom } from 'rxjs';

describe('ViewAllTopicsComponent', () => {
  let component: ViewAllTopicsComponent;
  let fixture: ComponentFixture<ViewAllTopicsComponent>;
  let service: TopicsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllTopicsComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, RouterTestingModule,
        TranslateModule.forRoot(), BrowserAnimationsModule]
    })
      .compileComponents();
  });

  // Mock service 
  beforeEach(() => {
    service = new TopicsService(null);
    component = new ViewAllTopicsComponent(service)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return topic data', () => {
  //   const EXPECTED_NUMBER_OF_ITEMS: number = 3;
  //   spyOn(service, 'getAllTopic').and.callFake(() => {
  //     return observableFrom([EXPECTED_NUMBER_OF_ITEMS])
  //   })
  //   component.ngOnInit()
  //   expect(component.dataSource.filteredData.length).toBe(EXPECTED_NUMBER_OF_ITEMS);
  // });
});
