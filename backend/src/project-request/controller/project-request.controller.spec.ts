import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRequestController } from './project-request.controller';
import { ProjectRequestService } from '../service/project-request.service';

describe('ProjectRequestController', () => {
  let controller: ProjectRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRequestController],
      providers: [ProjectRequestService],
    }).compile();

    controller = module.get<ProjectRequestController>(ProjectRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
