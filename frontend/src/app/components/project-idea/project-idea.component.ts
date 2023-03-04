import { Component, Input, OnInit } from '@angular/core';
import { ProjectRequest, ProjectRequestComment } from 'src/app/models/project-request.interface';

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

  constructor() { }

  ngOnInit(): void {
    if (this.projectRequest?.comments) {
      this.comments = this.projectRequest.comments;
    }
  }

  upvote() {
    this.voteCount++;
  }

  downvote() {
    this.voteCount--;
  }

  viewComments() {
    this.showComments = !this.showComments;
  }
}
