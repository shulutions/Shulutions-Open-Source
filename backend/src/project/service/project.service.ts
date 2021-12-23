import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../model/project.entity';
import { Project } from '../model/project.interface';
const slugify = require('slugify');

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
        private userService: UserService
    ) {}

    create(user: User, project: Project): Observable<Project> {
        project.projectManager = user;
        return this.generateSlug(project.title).pipe(
            switchMap((slug: string) => {
                project.slug = slug;
                return from(this.projectRepository.save(project));
            })
        )
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }

}
