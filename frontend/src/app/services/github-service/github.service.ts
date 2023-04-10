import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Contributor, Organization } from 'src/app/models/github-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

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

  getGithubOrganization(organisationName: string): Observable<Organization> {
    return this.noHeaderHttp.get<Organization>(`https://api.github.com/orgs/${organisationName}`);
  }
}
