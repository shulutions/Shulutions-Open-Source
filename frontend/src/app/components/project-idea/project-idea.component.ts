import { Component, Input, OnInit } from '@angular/core';
import { ProjectRequest, ProjectRequestComment } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-project-idea',
  templateUrl: './project-idea.component.html',
  styleUrls: ['./project-idea.component.scss']
})
export class ProjectIdeaComponent implements OnInit {

  @Input() projectRequest!: ProjectRequest
  comments: ProjectRequestComment[] = [];
  voteCount: number = 0;
  showComments: boolean = false;

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
  }

  viewComments() {
    if (!this.projectRequest.id) return;
    this.showComments = !this.showComments;
    this.projectRequestService.findComments(this.projectRequest.id).subscribe((comments: ProjectRequestComment[]) => {
      this.comments = comments;
    });
  }

  upvote() {
    this.voteCount++;
  }

  downvote() {
    this.voteCount--;
  }

  
}
