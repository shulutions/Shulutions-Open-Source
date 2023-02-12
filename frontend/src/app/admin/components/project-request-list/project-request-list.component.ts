import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-request-list',
  templateUrl: './project-request-list.component.html',
  styleUrls: ['./project-request-list.component.scss']
})
export class ProjectRequestListComponent implements OnInit {

  projectRequests: Observable<ProjectRequest[]> = this.projectRequestService.getAll();

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
    console.log(this.projectRequests.subscribe(data => console.log(data)))
  }

}
