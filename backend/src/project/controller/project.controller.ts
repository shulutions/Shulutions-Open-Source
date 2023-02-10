import { Body, Delete, Get, Param, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsProjectManagerGuard } from '../guards/user-is-project-manager.guard';
import { Project } from '../model/project.interface';
import { ProjectService } from '../service/project.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Image } from '../model/image-interface';
import { join } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


export const storage = {
    storage: diskStorage({
        destination: './uploads/project-images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('projects')
export class ProjectController {

    constructor(private projectService: ProjectService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    create(@Body() project: Project, @Request() req): Observable<Project> {
        const user = req.user;
        return this.projectService.create(user, project);
    }

    @Get()
    findProjects(@Query('userId') userId: number): Observable<Project[]> {
        if (userId == null) {
            return this.projectService.findAll();
        } else {
            return this.projectService.findByUser(userId);
        }
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Project> {
        return this.projectService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, UserIsProjectManagerGuard)
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() project: Project): Observable<Project> {
        return this.projectService.updateOne(Number(id), project)
    }

    @UseGuards(JwtAuthGuard, UserIsProjectManagerGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.projectService.deleteOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('image/upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
        return of(file);
    }

    @Get('image/:imagename')
    findImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/project-images/' + imagename)));
    }

}
