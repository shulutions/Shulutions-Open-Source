import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    return this.http.post<any>('backend/users/login', { email, password }).pipe(
      map((token) => {
        console.log("token")
        localStorage.setItem('token', token.access_token);
        return token;
      })
    )
  }
}
