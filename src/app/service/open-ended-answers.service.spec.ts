import { TestBed } from '@angular/core/testing';

import { OpenEndedAnswersService } from './open-ended-answers.service';

describe('OpenEndedAnswersService', () => {
  let service: OpenEndedAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenEndedAnswersService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
