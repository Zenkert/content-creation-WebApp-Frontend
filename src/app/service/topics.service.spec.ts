import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTopicComponent } from '../add-material/add-topic/add-topic.component';

import { TopicsService } from './topics.service';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopicComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ TopicsService ]
    });
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
