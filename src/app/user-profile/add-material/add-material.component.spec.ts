import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialComponent } from './add-material.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AddMaterialComponent', () => {
  let component: AddMaterialComponent;
  let fixture: ComponentFixture<AddMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaterialComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,
        TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
