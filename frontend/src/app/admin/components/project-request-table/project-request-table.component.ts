import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-request-table',
  templateUrl: './project-request-table.component.html',
  styleUrls: ['./project-request-table.component.scss']
})
export class ProjectRequestTableComponent implements OnInit {

  dataSource?: PaginationData;
  projects?: ProjectRequest[];
  itemsPerPage = 10;
  currentPage = 1;
  headers: string[] = [
    'Id', 
    'Title',  
    'Description',
  ];

  constructor(
    private projectRequestService: ProjectRequestService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectRequestService.findAll(this.currentPage, this.itemsPerPage).pipe(
      //tap(projectRequests => console.log(projectRequests)),
      map((paginationData: PaginationData) => this.dataSource = paginationData)
    ).subscribe();
  }
}
