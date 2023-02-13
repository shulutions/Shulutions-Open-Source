import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { Project } from 'src/app/models/project.interface';
import { User } from 'src/app/models/user.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  
  private subcription?: Subscription;
  projectId?: number;
  project!: Project;
  users?: User[];

  editProjectForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}, [Validators.required]),
    title: new FormControl([Validators.required]),
    description: new FormControl([Validators.required]),
    body: new FormControl([Validators.required]),
    discordLink: new FormControl(),
    githubLink: new FormControl(),
    figmaLink: new FormControl(),
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
        tap((project: Project) => console.log(project)),
        map((project: Project) => this.project = project)
      ).subscribe();
    })
    this.getUsers();
  }

  getUsers() {
    this.userService.findAll(1, 100).pipe(
      tap(users => console.log(users)),
      map((userData: PaginationData) => this.users = userData.items)
    ).subscribe();
  }

  onSubmit() {
    if(this.editProjectForm.invalid) return;

    this.projectService.updateOne(this.editProjectForm.value).pipe(
      map(token => this.router.navigate(['/admin']))
    ).subscribe();
  }

}
