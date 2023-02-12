import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { Project } from 'src/app/models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<Project> {
    return this.http.get<Project>('/backend/projects/' + id)
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('/backend/projects');
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('/backend/projects', project);
  }

  uploadProjectImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/backend/projects/image/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

}
