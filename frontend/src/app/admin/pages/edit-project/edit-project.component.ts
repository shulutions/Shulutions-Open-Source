import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subscription } from 'rxjs';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { catchError, map, tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { Project, ProjectStage } from 'src/app/models/project.interface';
import { User } from 'src/app/models/user.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { environment } from 'src/environments/environment';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  baseApiUrl: string = environment.baseApiUrl;
  @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;
  @ViewChild('deleteProjectModal', { static: false }) deleteProjectRequestModal: any;

  
  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }
  
  private subcription?: Subscription;
  projectId?: number;
  project!: Project;
  users?: User[];
  stages: string[] = Object.values(ProjectStage);
  showDeleteModal: boolean = false;

  editProjectForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}, [Validators.required]),
    title: new FormControl([Validators.required]),
    description: new FormControl([Validators.required]),
    body: new FormControl([Validators.required]),
    discordLink: new FormControl(),
    githubLink: new FormControl(),
    figmaLink: new FormControl(),
    stage: new FormControl(),
    projectManager: new FormControl(),
    image: new FormControl(),
    isActive: new FormControl(),
  })

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subcription = this.activatedRoute.params.subscribe(params => {
      this.projectId = parseInt(params['id']);
      this.projectService.findOne(this.projectId).pipe(
        map((project: Project) => {
          this.project = project
          this.editProjectForm.get('image')?.setValue(this.project?.image);
        })
      ).subscribe();
    })
    this.getUsers();
  }


  deleteProject(): void {
    this.projectService.deleteOne(this.projectId!)
      .subscribe(() => {
        this.router.navigate(['/admin']);
      });
  }
    
  goBack(): void {
    this.router.navigate(['/admin']);
  }

  onClick(){
    const fileInput = this.fileUpload.nativeElement
    fileInput.click();
  }

  getUsers() {
    this.userService.findAll(1, 100).pipe(
      map((userData: PaginationData<User>) => {
        this.users = userData.items;
        this.editProjectForm.get('projectManager')?.setValue(this.project?.projectManager?.id);
        this.editProjectForm.get('stage')?.setValue(this.project?.stage);
      })
    ).subscribe();
  }

  onSubmit() {
    if(this.editProjectForm.valid) {
      this.projectService.updateOne(this.project).subscribe();
      this.router.navigate(['/admin']);
    }
    else {
      // Display form validation errors
      Object.keys(this.editProjectForm.controls).forEach(field => {
        const control = this.editProjectForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
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
          this.project.image = event.body.filename;
          this.editProjectForm.patchValue({image: event.body.filename})
        }
      })
  }
}
