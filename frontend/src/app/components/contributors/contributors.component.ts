import { Component, Input, OnInit, Output } from '@angular/core';
import { GitHubStats, Contributor } from 'src/app/models/github-stats.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {

  @Input() projectTitle?: string;
  contributors?: Contributor[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getGithubRepositoryContributors()
  }

  getGithubRepositoryContributors() {
    this.projectService.getGithubRepositoryContributors(this.projectTitle).subscribe((contributors: Contributor[]) => {
      if (contributors.length > 0) {
        this.contributors = contributors;
      }
    })
  }
}
