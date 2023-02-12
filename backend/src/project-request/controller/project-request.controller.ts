import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectRequestService } from '../service/project-request.service';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';

@Controller('project-request')
export class ProjectRequestController {
  constructor(private readonly projectRequestService: ProjectRequestService) {}

  @Post()
  create(@Body() createProjectRequestDto: CreateProjectRequestDto) {
    return this.projectRequestService.create(createProjectRequestDto);
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
