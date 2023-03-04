import { Component, Input, OnInit } from '@angular/core';
import { ProjectRequest } from 'src/app/models/project-request.interface';

@Component({
  selector: 'app-project-idea',
  templateUrl: './project-idea.component.html',
  styleUrls: ['./project-idea.component.scss']
})
export class ProjectIdeaComponent implements OnInit {

  @Input() projectRequest!: ProjectRequest
  voteCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  upvote() {
    this.voteCount++;
  }

  downvote() {
    this.voteCount--;
  }

}
