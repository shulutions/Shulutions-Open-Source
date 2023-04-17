import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { Project } from 'src/app/models/project.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { TableData } from '../../models/table.interface';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})

export class ProjectTableComponent implements OnInit {

  navigationPath?: string = 'edit-project';
  dataSource?: PaginationData<Project>; // add projects to table data
  projects?: Project[];
  itemsPerPage = 40;
  currentPage = 1;
  headers: string[] = [
    'Id', 
    'Title',  
    'Description',
    'Stage',
  ];
  
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.projectService.findAll(this.currentPage, this.itemsPerPage).pipe(
      tap(projects => console.log(projects)),
      map((paginationData: PaginationData<Project>) => this.dataSource = paginationData)
    ).subscribe();
  }
}
