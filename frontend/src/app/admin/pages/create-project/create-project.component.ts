import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    image: new FormControl(null, [Validators.required]),
  })

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.createProjectForm.invalid) {
      return;
    }
    this.projectService.createProject(this.createProjectForm.getRawValue()).subscribe();
    this.router.navigate(['/admin']);
  }

  onClick(){
    const fileInput = this.fileUpload.nativeElement
    fileInput.click();
  }

  fileChange() {
    const fileInput = this.fileUpload.nativeElement
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      };
      console.log(this.file.data)
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

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
