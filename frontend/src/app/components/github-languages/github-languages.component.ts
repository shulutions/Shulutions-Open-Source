import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project-service/project.service';

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

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getGithubRepositoryLanguages();
  }

  getGithubRepositoryLanguages() {
    this.projectService.getGithubRepositoryLanguages(this.projectTitle).subscribe((languages: object) => {
      this.languages = Object.keys(languages).join(', ');
    })
  }
}
