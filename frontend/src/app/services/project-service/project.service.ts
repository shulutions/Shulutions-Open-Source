import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contributor, Organization } from 'src/app/models/github-stats.interface';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { Project } from 'src/app/models/project.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.baseApiUrl}/projects/` + id)
  }

  findAll(page: number, limit: number): Observable<PaginationData<Project>> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get(`${environment.baseApiUrl}/projects`, {params}).pipe(
      map((projectData: PaginationData<Project> | any) => projectData), //why does this return an object not of type UserData?
      catchError(err => throwError(err))
    )
  }

  // no longer used
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseApiUrl}/projects`);
  }

  updateOne(project: Project): Observable<Project> {
    return this.http.put<Project>(`${environment.baseApiUrl}/projects/` + project.id, project)
  }

  getProjects(page: number, limit: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseApiUrl}/projects?page=${page}&limit=${limit}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.baseApiUrl}/projects`, project);
  }

  uploadProjectImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(`${environment.baseApiUrl}/projects/image/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteOne(id: number): Observable<any> {
    return this.http.delete(`${environment.baseApiUrl}/projects/` + id);
  }
}
