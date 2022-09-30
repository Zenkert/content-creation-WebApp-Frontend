import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicListComponent } from './view-topic-list.component';

describe('ViewTopicListComponent', () => {
  let component: ViewTopicListComponent;
  let fixture: ComponentFixture<ViewTopicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTopicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
