import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/project-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectRequestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectRequest[]> {
    return this.http.get<ProjectRequest[]>('/backend/project-request');
  }

  submitProjectRequest(projectRequest: ProjectRequest) {
    return this.http.post<ProjectRequest>('/backend/project-request', projectRequest);
  }

}
