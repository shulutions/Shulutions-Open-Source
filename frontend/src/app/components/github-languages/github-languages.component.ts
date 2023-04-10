import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github-service/github.service';

export interface Language {
  name: string,
  lines: number
}

@Component({
  selector: 'app-github-languages',
  templateUrl: './github-languages.component.html',
  styleUrls: ['./github-languages.component.scss']
})
export class GithubLanguagesComponent implements OnInit {

  @Input() projectTitle?: string;
  languages?: string;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.getGithubRepositoryLanguages();
  }

  getGithubRepositoryLanguages() {
    this.githubService.getGithubRepositoryLanguages(this.projectTitle).subscribe((languages: object) => {
      this.languages = Object.keys(languages).join(', ');
    })
  }
}
