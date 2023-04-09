import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectRequestReaction } from 'src/app/models/project-request-reaction.interface';
import { ProjectRequest, ProjectRequestComment } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-project-idea',
  templateUrl: './project-idea.component.html',
  styleUrls: ['./project-idea.component.scss']
})
export class ProjectIdeaComponent implements OnInit {

  @Input() projectRequest!: ProjectRequest
  @Output() getProjectRequests: EventEmitter<any> = new EventEmitter();
  comments: ProjectRequestComment[] = [];
  voteCount: number = 0;
  showComments: boolean = false;
  upvoted: boolean = false;
  downvoted: boolean = false;

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
    this.getReaction();
    console.log(this.projectRequest)
  }

  getReaction() {
    this.downvoted = false;
    this.upvoted = false;
    this.projectRequestService.getReaction(this.projectRequest.id!).subscribe((reaction: ProjectRequestReaction) => {
      if (reaction.reaction === 'up') this.upvoted = true;
      if (reaction.reaction === 'down') this.downvoted = true;
    })
  }

  refreshComments(event: any) {
    this.viewComments();
    this.showComments = true;
  }

  viewComments() {
    if (!this.projectRequest.id) return;
    this.showComments = !this.showComments;
    this.projectRequestService.findComments(this.projectRequest.id).subscribe((comments: ProjectRequestComment[]) => {
      this.comments = comments;
    });
  }

  upvote() {
    const reaction: ProjectRequestReaction = {reaction: 'up'}
    this.vote(reaction);
  }

  downvote() {
    const reaction: ProjectRequestReaction = {reaction: 'down'}
    this.vote(reaction);
  }

  vote(reaction: ProjectRequestReaction) {
    this.projectRequestService.submitReaction(this.projectRequest.id!, reaction).subscribe((response) => {
      this.getProjectRequests.emit(response);
    })
  }
  
}
