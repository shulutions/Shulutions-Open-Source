import { Injectable } from '@nestjs/common';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';

@Injectable()
export class ProjectRequestService {
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
