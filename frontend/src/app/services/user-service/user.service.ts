import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../authentification-service/authentification.service';

export interface UserData {
  items: User[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<User> {
    return this.http.get('/backend/users/' + id).pipe(
      map((user: User) => user)
    )
  }

  updateOne(user: User): Observable<User> {
    return this.http.put('backend/users/' + user.id, user)
  }

  findAll(page: number, limit: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get('/backend/users', {params}).pipe(
      map((userData: UserData | any) => userData), //why does return an object not of type UserData?
      catchError(err => throwError(err))
    )
  }
}
