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
  @Output() contributorEvent = new EventEmitter<boolean>();
  gitHubStats: GitHubStats = {}
  contributors: Contributor[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getGithubRepositoryContributors()
  }

  getGithubRepositoryContributors() {
    this.projectService.getGithubRepositoryContributors(this.projectTitle).subscribe((contributors: Contributor[]) => {
      if (contributors.length > 0) {
        this.contributorEvent.emit(true)
        this.contributors = contributors;
      }
    })
  }

}
