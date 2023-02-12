import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectRequestService } from '../service/project-request.service';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectRequest } from '../entities/project-request.entity';

@Controller('project-request')
export class ProjectRequestController {
  constructor(private readonly projectRequestService: ProjectRequestService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  create(@Body() createProjectRequestDto: CreateProjectRequestDto, @Request() req): Observable<ProjectRequest> {
    const user = req.user;
    return this.projectRequestService.create(user, createProjectRequestDto);
  }

  @Get()
  findAll() {
    return this.projectRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectRequestDto: UpdateProjectRequestDto) {
    return this.projectRequestService.update(+id, updateProjectRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectRequestService.remove(+id);
  }
}
