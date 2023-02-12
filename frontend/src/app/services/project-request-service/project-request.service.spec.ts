import { TestBed } from '@angular/core/testing';

import { ProjectRequestService } from './project-request.service';

describe('ProjectRequestService', () => {
  let service: ProjectRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
