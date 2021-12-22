import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginForm {
  email: string;
  password: string;
};

export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
};

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>('backend/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        console.log("token")
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
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

}
