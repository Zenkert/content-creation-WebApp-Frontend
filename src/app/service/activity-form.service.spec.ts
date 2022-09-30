import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivityFormService } from './activity-form.service';

describe('ActivityFormService', () => {
  let service: ActivityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ActivityFormService ]
    });
    service = TestBed.inject(ActivityFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
