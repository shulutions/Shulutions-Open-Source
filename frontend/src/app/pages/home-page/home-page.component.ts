import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github-service/github.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  repositoryCount: number = 0;
  userCount?: number;
  projectRequestCount?: number;

  constructor(
    private githubService: GithubService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.githubService.getGithubOrganization("shulutions").subscribe((data: any) => {
      this.repositoryCount = data.public_repos;
    })

    this.userService.getUserCount().subscribe((count: number) => {
      this.userCount = count;
    });

    this.userService.getProjectRequestCount().subscribe((count: number) => {
      this.projectRequestCount = count;
    });
  }

}
