import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { ProjectRequestModule } from './project-request/project-request.module';
import { AppInitService } from './app-init.service';
import { UserEntity } from './user/model/user.entity';
import { RoleEntity } from './user/model/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === 'development' ? 'sqlite' : 'postgres',
      database: process.env.NODE_ENV === 'development' ? 'db' : undefined,
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ProjectModule,
    UserModule,
    AuthModule,
    ProjectRequestModule
  ],
  controllers: [AppController],
  providers: [AppService, AppInitService],
})
export class AppModule implements OnModuleInit {
  constructor(private appInitService: AppInitService) {}

  async onModuleInit() {
    await this.appInitService.seedRolesAndAssignAdmin();
  }
}
