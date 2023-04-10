import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github-service/github.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  repositoryCount: number = 0;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.getGithubOrganization("shulutions").subscribe((data: any) => {
      this.repositoryCount = data.public_repos;
    })
  }

}
