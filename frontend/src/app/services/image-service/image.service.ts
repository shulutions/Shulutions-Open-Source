import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.interface';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  create(image: { url: string, projectId: number }) {
    return this.http.post<Image>(`/backend/images/`, image)
  }
}
