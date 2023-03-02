import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { switchMap, from, Observable, of } from 'rxjs';
import { Project } from 'src/project/model/project.interface';
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

  findAll(): Observable<ProjectRequest[]> {
    return from(this.projectRequestRepository.find({relations: ['submittedBy']}));
  }

  paginate(options: IPaginationOptions): Observable<Pagination<ProjectRequest>> {
    return from(paginate<ProjectRequest>(this.projectRequestRepository, options, {relations: ['submittedBy']}))
  } 

  findOne(id: number) {
    return from(this.projectRequestRepository.findOne(id, {relations: ['submittedBy']}));
  }

  update(id: number, updateProjectRequestDto: UpdateProjectRequestDto) {
    return from(this.projectRequestRepository.update(id, updateProjectRequestDto));
  }

  remove(id: number) {
    return `This action removes a #${id} projectRequest`;
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
}
}
