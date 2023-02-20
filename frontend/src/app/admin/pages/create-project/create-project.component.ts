import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;
  selectedImages: string[] = [];

  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

  createProjectForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}),
    title: new FormControl(null, [Validators.required]),
    slug: new FormControl({value: null, disabled: true}),
    description: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
    images: new FormControl(null, [Validators.required]),
  })

  constructor(private projectService: ProjectService, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.projectService.createProject(this.createProjectForm.getRawValue())
      .subscribe(projectResponse => {
        const projectId = projectResponse.id;
        // Create image records for selected images and associate them with the new project
        this.selectedImages.forEach(image => {
          const newImage = {
            url: image,
            projectId: projectId!
          };
          this.imageService.create(newImage)
            .subscribe(imageResponse => {
              // Handle image creation response
              console.log(imageResponse)
            });
        });
        // Handle project creation response
      });
    // Submit form
  }

  createProject() {
    this.projectService.createProject(this.createProjectForm.getRawValue()).subscribe();
  }

  onSelectedImages(images: string[]) {
    console.log(images)
    this.selectedImages = images;
  }

  async uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);

    this.projectService.uploadProjectImage(formData).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total) // this might need changing after adding a progress bar
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if( typeof(event) === 'object') {
          console.log(event.body)
          this.createProjectForm.patchValue({image: event.body.filename})
        }
      })
  }
}
