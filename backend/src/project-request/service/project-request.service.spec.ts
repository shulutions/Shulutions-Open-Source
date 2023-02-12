import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRequestService } from './project-request.service';

describe('ProjectRequestService', () => {
  let service: ProjectRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRequestService],
    }).compile();

    service = module.get<ProjectRequestService>(ProjectRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
