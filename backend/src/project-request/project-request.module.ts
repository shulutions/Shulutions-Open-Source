import { Module } from '@nestjs/common';
import { ProjectRequestService } from './service/project-request.service';
import { ProjectRequestController } from './controller/project-request.controller';

@Module({
  controllers: [ProjectRequestController],
  providers: [ProjectRequestService]
})
export class ProjectRequestModule {}
