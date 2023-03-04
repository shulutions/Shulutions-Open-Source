import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  dataSource?: PaginationData;
  projectRequests?: ProjectRequest[];
  itemsPerPage = 10;
  currentPage = 1;
  
  constructor(private projectRequestService: ProjectRequestService,) { }

  ngOnInit(): void {
    this.getProjectRequests();
  }

  getProjectRequests() {
    this.projectRequestService.findAll(this.currentPage, this.itemsPerPage).pipe(
      //tap(projectRequests => console.log(projectRequests)),
      map((paginationData: PaginationData) => {
        this.dataSource = paginationData
        this.projectRequests = paginationData.items
      })
    ).subscribe();
  }

}
