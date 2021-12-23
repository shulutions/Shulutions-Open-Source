import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { ProjectEntity } from './model/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    UserModule
  ]
})
export class ProjectModule {}
