import { Body, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { query } from 'express';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Project } from '../model/project.interface';
import { ProjectService } from '../service/project.service';

@Controller('projects')
export class ProjectController {

    constructor(private projectService: ProjectService) {}


    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()project: Project, @Request() req): Observable<Project> {
        const user = req.user.user;
        return this.projectService.create(user, project);
    }

    @Get()
    findProjects(@Query('userId') userId: number): Observable<Project[]> {
        if(userId == null) {
            return this.projectService.findAll();
        } else {
            return this.projectService.findByUser(userId);
        }
    }   

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Project> {
        return this.projectService.findOne(id);
    }

}
