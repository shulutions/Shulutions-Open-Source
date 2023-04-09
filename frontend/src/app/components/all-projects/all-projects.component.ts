import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { Project } from 'src/app/models/project.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  baseApiUrl: string = environment.baseApiUrl;
  dataSource?: PaginationData;
  projects?: Project[];
  itemsPerPage: number = 200;
  currentPage: number = 1;
  
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.projectService.findAll(this.currentPage, this.itemsPerPage).subscribe((paginationData: PaginationData) => {
      const filteredProjects = paginationData.items.filter(project => project.isActive);
      this.projects = filteredProjects;
    });
  }

}
