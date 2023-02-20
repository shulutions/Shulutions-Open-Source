import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  // selectedFiles?: FileList;
  // currentFileUpload?: File;
  // uploadSuccess: boolean = false;
  // uploadError: boolean = false;

  // constructor(private apiService: ApiService) {}

  // ngOnInit() {
  // }

  // selectFile(event: any) {
  //   this.selectedFiles = event.target.files;
  // }

  // upload() {
  //   if (this.selectedFiles) {
  //     const fileCount: number = this.selectedFiles.length;
  //     const formData = new FormData();
      
  //     for (let i = 0; i < fileCount; i++) {
  //       const fileItem: File | null = this.selectedFiles.item(i);
  //       if (fileItem) {
  //         formData.append('file[]', fileItem);
  //       }
  //     }

  //     this.apiService.submitImage(formData).subscribe(
  //       response => {
  //         this.uploadSuccess = true;
  //         this.uploadError = false;
  //       },
  //       error => {
  //         this.uploadSuccess = false;
  //         this.uploadError = true;
  //       }
  //     );
  //   }
  // }

  @ViewChild('uploadField') uploadField!: ElementRef;

  ids: number[] = [];
  files: File[] = [];
  images: string[] = [];

  imageUploadForm: FormGroup = new FormGroup({
    file: new FormControl([Validators.required]),
    fileSource: new FormControl([Validators.required]),
  })

  constructor(private apiService: ApiService) {}

  ngOnInit() {
  }

  /**
   * Returns the form controls as an object.
   */  
  get f(): any {
    return this.imageUploadForm.controls;
  }

  /**
   * Adds the selected image files to the files array and reads them using the FileReader API.
   */
  onFileChange(event: any) {
    const files = Array.from(event.target.files);
    files.forEach((file: any) => {
      this.files.push(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push(reader.result as string);
        this.imageUploadForm.patchValue({
          fileSource: this.images
        });
      };
    });
  }

  /**
   * Focuses on the file input field to allow users to select a file by pressing Enter.
   */
  focusOnUpload(): void {
    this.uploadField.nativeElement.focus();
  }

  /**
   * Clears the selected files and images.
   */
  clearFiles(): void {
    this.files = [];
    this.images = [];
    this.ids = [];
    this.uploadField.nativeElement.value = null;
  }

  /**
   * Uploads the selected image files to the server using the ApiService.
   * @returns An observable that resolves when all uploads are complete.
   */
  uploadFiles(): Observable<any> | null {
    if (this.files.length === 0) {
      return null;
    }

    const tasks: Observable<any>[] = [];
    this.files.forEach((file: File) => {
      const formData: FormData = new FormData();
      formData.append('file', file);

      const task = this.apiService.submitImage(formData);
      task.subscribe((image: any) => {
        this.ids.push(image.id);
      });

      tasks.push(task);
    });

    this.clearFiles();
    return forkJoin(tasks);
  }

  /**
   * Returns the uploaded image IDs.
   */
  getIds(): number[] {
    return this.ids;
  }
}
