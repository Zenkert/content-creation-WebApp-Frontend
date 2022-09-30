import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpenendedAnswersComponent } from './view-openended-answers.component';

describe('ViewOpenendedAnswersComponent', () => {
  let component: ViewOpenendedAnswersComponent;
  let fixture: ComponentFixture<ViewOpenendedAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOpenendedAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOpenendedAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
