import { Body, Request, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
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

}
