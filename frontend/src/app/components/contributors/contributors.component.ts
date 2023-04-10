import { Component, Input, OnInit, Output } from '@angular/core';
import { Contributor } from 'src/app/models/github-stats.interface';
import { GithubService } from 'src/app/services/github-service/github.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {

  @Input() projectTitle?: string;
  contributors?: Contributor[];

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.getGithubRepositoryContributors()
  }

  getGithubRepositoryContributors() {
    this.githubService.getGithubRepositoryContributors(this.projectTitle).subscribe((contributors: Contributor[]) => {
      if (contributors.length > 0) {
        this.contributors = contributors;
      }
    })
  }
}
