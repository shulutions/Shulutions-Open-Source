import { Module } from '@nestjs/common';
import { ProjectRequestService } from './service/project-request.service';
import { ProjectRequestController } from './controller/project-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProjectRequest } from './entities/project-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRequest]),
    AuthModule,
    UserModule
  ],
  controllers: [ProjectRequestController],
  providers: [ProjectRequestService]
})
export class ProjectRequestModule {}
