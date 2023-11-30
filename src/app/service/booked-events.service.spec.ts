import { TestBed } from '@angular/core/testing';

import { BookedEventsService } from './booked-events.service';

describe('BookedEventsService', () => {
  let service: BookedEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
