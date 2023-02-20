import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  images: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() selectedImages = new EventEmitter<string[]>();

  showRemoveButton: boolean[] = [];

  constructor() {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
        this.showRemoveButton.push(false);
        this.selectedImages.emit(this.images);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.showRemoveButton.splice(index, 1);
    this.selectedImages.emit(this.images);
  }
}
