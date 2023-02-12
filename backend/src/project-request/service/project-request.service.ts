import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { switchMap, from, Observable, of } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { ProjectRequest } from '../entities/project-request.entity';
const slugify = require('slugify');

@Injectable()
export class ProjectRequestService {

  constructor (
    @InjectRepository(ProjectRequest) private readonly projectRequestRepository: Repository<ProjectRequest>,

    ) {}

  create(user: User, projectRequest: CreateProjectRequestDto): Observable<ProjectRequest> {
    return this.generateSlug(projectRequest.title).pipe(
      switchMap((slug: string) => {
          projectRequest.submittedBy = user;
          projectRequest.slug = slug;
          return from(this.projectRequestRepository.save(projectRequest));
      })
    )
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

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
}
}
