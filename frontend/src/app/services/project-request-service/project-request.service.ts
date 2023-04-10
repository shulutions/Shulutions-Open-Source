import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequestReaction } from 'src/app/models/project-request-reaction.interface';
import { ProjectRequest, ProjectRequestComment, ProjectRequestForm } from 'src/app/models/project-request.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectRequestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectRequest[]> {
    return this.http.get<ProjectRequest[]>(`${environment.baseApiUrl}/project-request`);
  }

  findAll(page: number, limit: number): Observable<PaginationData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get(`${environment.baseApiUrl}/project-request`, {params}).pipe(
      map((projectRequestData: PaginationData | any) => projectRequestData),
      catchError(err => throwError(err))
    )
  }

  findOne(id: number): Observable<ProjectRequest> {
    return this.http.get<ProjectRequest>(`${environment.baseApiUrl}/project-request/${id}`);
  }

  submitProjectRequest(projectRequest: ProjectRequestForm) {
    return this.http.post<ProjectRequest>(`${environment.baseApiUrl}/project-request`, projectRequest);
  }

  updateProjectRequest(projectRequest: ProjectRequest) {
    return this.http.patch<ProjectRequest>(`${environment.baseApiUrl}/project-request/${projectRequest.id}`, projectRequest);
  }

  deleteProjectRequest(id: number) {
    return this.http.delete(`${environment.baseApiUrl}/project-request/${id}`);
  }

  comment(id: number, comment: ProjectRequestComment) {
    return this.http.post(`${environment.baseApiUrl}/project-request/${id}/comment`, comment);
  }

  findComments(projectRequestId: number) {
    return this.http.get<ProjectRequestComment[]>(`${environment.baseApiUrl}/project-request/${projectRequestId}/comment`);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${environment.baseApiUrl}/project-request/comment/${commentId}`);
  }

  submitReaction(projectId: number, reaction: ProjectRequestReaction) {
    return this.http.post<ProjectRequestReaction>(`${environment.baseApiUrl}/project-request/${projectId}/vote`, reaction);
  }

  getReactionTotal(projectId: number) {
    return this.http.get(`${environment.baseApiUrl}/project-request/${projectId}/vote`);
  }

  getReaction(projectId: number) {
    return this.http.get<ProjectRequestReaction>(`${environment.baseApiUrl}/project-request/${projectId}/vote`);
  }
}
