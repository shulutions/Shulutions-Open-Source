import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { Project } from 'src/app/models/project.interface';
import { map, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})

export class ViewProjectComponent implements OnInit {

  project?: Project;
  discordLink?: SafeResourceUrl;
  gitHubRepository?: any;
  hasContributor: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private projectService: ProjectService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const projectId: number = parseInt(params['id']);
      this.projectService.findOne(projectId).pipe(
        map((project: Project) => {
          this.project = project;
          if (project.discordLink) {
            this.discordLink = this.sanitizer.bypassSecurityTrustResourceUrl(project.discordLink);      
          }
          this.getGithubRepository(project.title);
        })
      ).subscribe();
    })
  }

  getGithubRepository(projectTitle?: string) {
    this.projectService.getGithubRepository(projectTitle).subscribe((data: any) => {
      this.gitHubRepository = data;
      console.log("Repo: ")
      console.log(this.gitHubRepository)
    })
  }

  hasContributorEvent(hasContributor: boolean) {
    if (hasContributor) this.hasContributor = true;
  }
}
