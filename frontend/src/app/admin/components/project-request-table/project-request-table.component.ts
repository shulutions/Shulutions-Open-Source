import { Component, OnInit } from '@angular/core';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

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
    'Stage',
  ];

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
    console.log(this.projectRequestService.getAll());
  }

  getProjects() {
    this.projectRequestService.getAll(this.currentPage, this.itemsPerPage).pipe(
      tap(projects => console.log(projects)),
      map((paginationData: PaginationData) => this.dataSource = paginationData)
    ).subscribe();
  }
}
