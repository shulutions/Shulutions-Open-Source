import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { Project } from 'src/app/models/project.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-manage-project-request',
  templateUrl: './manage-project-request.component.html',
  styleUrls: ['./manage-project-request.component.scss']
})
export class ManageProjectRequestComponent implements OnInit {

  projectRequestId?: number;
  projectRequest!: ProjectRequest;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private projectRequestService: ProjectRequestService,
  ) { }

  ngOnInit(): void {
    this.projectRequestId = this.activatedRoute.snapshot.params.id;
    this.getProjectRequest();
  }

  getProjectRequest() {
    if (!this.projectRequestId) {
      this.router.navigate(['admin', 'project-requests']);
      alert('No project request id provided');
    }
    this.projectRequestService.findOne(this.projectRequestId!).pipe(
      map((projectRequest: ProjectRequest) => this.projectRequest = projectRequest)
    ).subscribe();
  }

  updateProjectRequest(): void {
    this.projectRequestService.updateProjectRequest(this.projectRequest)
    .subscribe(() => console.log('Project request updated'));
  }
    
  goBack(): void {
    this.router.navigate(['/admin']);
  }

}
