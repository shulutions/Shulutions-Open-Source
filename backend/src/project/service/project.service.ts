import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { map } from 'rxjs';
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
    
    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<Project>(this.projectRepository, options, {relations: ['projectManager']}))
        // return from(paginate<Project>(this.projectRepository, options)).pipe(
        //     map((projectsPageable: Pagination<User>) => {
        //         // projectsPageable.items.forEach((v) => delete v.password);
        //         return projectsPageable;
        //     })
        // )
    }

    findAll(): Observable<Project[]> {
        return from(this.projectRepository.find({relations: ['projectManager']}));
    }

    findOne(id: number): Observable<Project> {
        return from(this.projectRepository.findOne(id, {relations: ['projectManager']}))
    }

    findByUser(userId: number): Observable<Project[]> {
        return from(this.projectRepository.find({
            where: {
                projectManager: userId
            },
            relations: ['projectManager']
        })).pipe(
            map((projects: Project[]) => projects)
        )
    }

    updateOne(id: number, project: Project): Observable<Project> {
        return from(this.projectRepository.update(id, project)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.projectRepository.delete(id));
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }

}
