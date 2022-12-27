import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/model/project.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  projects: Observable<Project[]> = this.projectService.getAll();
  

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log(this.projects.subscribe(data => console.log(data) ))
  }

}
