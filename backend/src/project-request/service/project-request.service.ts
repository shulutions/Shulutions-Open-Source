import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { switchMap, from, Observable, of } from 'rxjs';
import { Project } from 'src/project/model/project.interface';
import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { CreateProjectRequestReactionDto } from '../dto/create-project-request-reaction.dto';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { ProjectRequestComment } from '../entities/project-request-comment.entity';
import { ProjectRequestReaction } from '../entities/project-request-reaction.entity';
import { ProjectRequest } from '../entities/project-request.entity';
const slugify = require('slugify');

@Injectable()
export class ProjectRequestService {

  constructor (
    @InjectRepository(ProjectRequest) private readonly projectRequestRepository: Repository<ProjectRequest>,
    @InjectRepository(ProjectRequestComment) private readonly projectRequestCommentRepository: Repository<ProjectRequestComment>,
    @InjectRepository(ProjectRequestReaction) private readonly projectRequestReactionRepository: Repository<ProjectRequestReaction>,
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
    return from(this.projectRequestRepository.find({relations: ['submittedBy', 'reactions']}));
  }

  paginate(options: IPaginationOptions): Observable<Pagination<ProjectRequest>> {
    return from(paginate<ProjectRequest>(this.projectRequestRepository, options, {relations: ['submittedBy', 'reactions']}))
  } 

  findOne(id: number) {
    return from(this.projectRequestRepository.findOne(id, {relations: ['submittedBy']}));
  }

  update(id: number, updateProjectRequestDto: UpdateProjectRequestDto) {
    return from(this.projectRequestRepository.update(id, updateProjectRequestDto));
  }

  remove(id: number) {
    return from(this.projectRequestRepository.delete(id));
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }

  comment(user: User, id: string, comment: string): Observable<ProjectRequestComment> {
    return from(this.projectRequestRepository.findOne(id)).pipe(
      switchMap((projectRequest: ProjectRequest) => {
        const newComment = new ProjectRequestComment();
        newComment.comment = comment;
        newComment.projectRequest = projectRequest;
        newComment.postedBy = user;

        return from(this.projectRequestCommentRepository.save(newComment));
      })
    )
  }

  getComments(id: string): Observable<ProjectRequestComment[]> {
    return from(this.projectRequestCommentRepository.find({
      where: {projectRequest: id}, 
      relations: ['postedBy']
    }));
  }

  deleteComment(user: User, commentId: number): Observable<ProjectRequestComment> {
    return from(this.projectRequestCommentRepository.findOne(commentId, {relations: ['postedBy']})).pipe(
      switchMap((comment: ProjectRequestComment) => {
        if (comment.postedBy.id !== user.id) {
          throw new Error("You cannot delete this comment");
        } else {
          return from(this.projectRequestCommentRepository.remove(comment));
        }
      })
    )
  }

  async react(user: UserEntity, projectRequestId: number, vote: CreateProjectRequestReactionDto) {
    const existingReaction: ProjectRequestReaction = await this.projectRequestReactionRepository.findOne({
      where: {postedBy: user.id}
    })

    return from(this.projectRequestRepository.findOne(projectRequestId)).pipe(
      switchMap((projectRequest: ProjectRequest) => {
        if (!existingReaction) {
          const newReaction = new ProjectRequestReaction();
          newReaction.postedBy = user;
          newReaction.projectRequest = projectRequest;
          newReaction.reaction = vote.reaction

          return from(this.projectRequestReactionRepository.save(newReaction));
        } else {
          existingReaction.reaction = vote.reaction;
          return from(this.projectRequestReactionRepository.update(existingReaction.id, existingReaction))
        }
      })
    ) 
  }

  // Get a total count of reactions for a project request
  async getReactionTotal(projectRequestId: number): Promise<number> {
    const upVotes = await this.projectRequestReactionRepository.count({
      where: {projectRequest: projectRequestId, reaction: 'up'}
    });

    const downVotes = await this.projectRequestReactionRepository.count({
      where: {projectRequest: projectRequestId, reaction: 'down'}
    });

    return upVotes - downVotes;
  }
}
