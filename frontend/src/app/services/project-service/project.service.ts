import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contributor } from 'src/app/models/github-stats.interface';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { Project } from 'src/app/models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private noHeaderHttp: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.noHeaderHttp = new HttpClient(handler)
  }

  getGithubRepository(repoName: string | undefined): Observable<any> {
    if (!repoName) {
      return throwError("No repository name provided");
    }
    return this.noHeaderHttp.get<any>(`https://api.github.com/repos/shulutions/${repoName}`);
  }

  getGithubRepositoryLanguages(repoName: string | undefined): Observable<any> {
    if (!repoName) {
      return throwError("No repository name provided");
    }
    return this.noHeaderHttp.get<any>(`https://api.github.com/repos/shulutions/${repoName}/languages`);
  }

  getGithubRepositoryContributors(repoName: string | undefined): Observable<any> {
    if (!repoName) {
      return throwError("No repository name provided");
    }
    return this.noHeaderHttp.get<Contributor[]>(`https://api.github.com/repos/shulutions/${repoName}/contributors`);
  }

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

  // no longer used
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('/backend/projects');
  }

  updateOne(project: Project): Observable<Project> {
    return this.http.put<Project>('/backend/projects/' + project.id, project)
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
