import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

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

  getUserCount(): Observable<number> {
    return this.http.get(`${environment.baseApiUrl}/users/count`).pipe(
      map((userCount: any) => {
        return userCount;
      })
    );
  }
  
  findOne(id: number): Observable<User> {
    return this.http.get(`${environment.baseApiUrl}/users/` + id).pipe(
      map((user: User) => user)
    )
  }

  updateOne(user: User): Observable<User> {
    return this.http.put(`${environment.baseApiUrl}/users/` + user.id, user)
  }

  findAll(page: number, limit: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get(`${environment.baseApiUrl}/users`, {params}).pipe(
      map((userData: UserData | any) => userData), //why does this return an object not of type UserData?
      catchError(err => throwError(err))
    )
  }
}
