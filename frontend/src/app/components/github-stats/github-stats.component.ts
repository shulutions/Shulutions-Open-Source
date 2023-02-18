import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contributor, GitHubStats } from 'src/app/models/github-stats.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-github-stats',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.scss']
})
export class GithubStatsComponent implements OnInit {

  @Input() projectTitle?: string;

  constructor() { }

  ngOnInit(): void {
  }
}
