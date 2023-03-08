import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

export interface LoginForm {
  email: string;
  password: string;
};

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {
    console.log(environment.baseApiUrl)
    return this.http.post<any>(`${environment.baseApiUrl}/backend/users/login`, { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        console.log("token")
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }
  
  register(user: User) {
    return this.http.post<any>('backend/users/', user).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if(token) return !this.jwtHelper.isTokenExpired(token);
    return false;
  }

  getUserId(): number {
    let jwt: string | null = localStorage.getItem(JWT_NAME);
    if (jwt) {
      let decoded: number = this.jwtHelper.decodeToken(jwt).user.id;
      return decoded;
    }
    return -1;
  }

  getUserRoles(): string[] {
    let jwt: string | null = localStorage.getItem(JWT_NAME);
    if (jwt) {
      let decoded: string[] = this.jwtHelper.decodeToken(jwt).user.roles.map((role: any) => role.name);
      return decoded;
    }
    return [];
  } 
}
