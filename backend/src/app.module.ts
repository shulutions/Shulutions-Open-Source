import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { ProjectRequestModule } from './project-request/project-request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === 'development' ? 'sqlite' : 'postgres',
      database: process.env.NODE_ENV === 'development' ? 'db' : undefined,
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProjectModule,
    UserModule,
    AuthModule,
    ProjectRequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
