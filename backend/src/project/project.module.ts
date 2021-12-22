import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './model/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
  ]
})
export class ProjectModule {}
