import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  submitImage(image: FormData) {
    return this.http.post<Image>(`/backend/images/`, image)
  }
}
