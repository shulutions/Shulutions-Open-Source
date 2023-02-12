import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { ProjectRequest } from '../entities/project-request.entity';

@Injectable()
export class ProjectRequestService {

  constructor (
    @InjectRepository(ProjectRequest) private readonly projectRequestRepository: Repository<ProjectRequest>,
    
    ) {}

  create(createProjectRequestDto: CreateProjectRequestDto) {
    return 'This action adds a new projectRequest';
  }

  findAll() {
    return `This action returns all projectRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectRequest`;
  }

  update(id: number, updateProjectRequestDto: UpdateProjectRequestDto) {
    return `This action updates a #${id} projectRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectRequest`;
  }
}
