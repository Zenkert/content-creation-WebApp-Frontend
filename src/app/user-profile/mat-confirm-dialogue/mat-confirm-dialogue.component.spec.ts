import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogueComponent } from './mat-confirm-dialogue.component';

describe('MatConfirmDialogueComponent', () => {
  let component: MatConfirmDialogueComponent;
  let fixture: ComponentFixture<MatConfirmDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
