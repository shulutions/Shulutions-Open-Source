import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
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

  findAll(page: number, limit: number): Observable<PaginationData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get('/backend/projects', {params}).pipe(
      map((projectData: PaginationData | any) => projectData), //why does this return an object not of type UserData?
      catchError(err => throwError(err))
    )
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('/backend/projects');
  }

  getProjects(page: number, limit: number): Observable<Project[]> {
    return this.http.get<Project[]>(`/projects?page=${page}&limit=${limit}`);
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
