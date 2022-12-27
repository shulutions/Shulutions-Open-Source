import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { Project } from 'src/app/model/project.interface';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})

export class ViewProjectComponent implements OnInit {

  project$: Observable<Project> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const projectId: number = parseInt(params['id']);

      return this.projectService.findOne(projectId).pipe(
        map((project: Project) => project)
      )
    })
  ) 

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
