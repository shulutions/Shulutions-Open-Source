import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
};

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>('backend/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        console.log("token")
        localStorage.setItem('token', token.access_token);
        return token;
      })
    )
  }
  
  register(user: User) {
    return this.http.post<any>('backend/users/', user).pipe(
      map(user => user)
    )
  }
}
