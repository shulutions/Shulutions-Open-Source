import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-request-form',
  templateUrl: './project-request-form.component.html',
  styleUrls: ['./project-request-form.component.scss']
})
export class ProjectRequestFormComponent implements OnInit {

  projectRequestForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    private projectRequestService: ProjectRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.projectRequestForm.invalid) {
      return;
    }
    console.log(this.projectRequestForm.value)
    this.projectRequestService.submitProjectRequest(this.projectRequestForm.value).pipe(
      map(projectRequest => {
        console.log(projectRequest)
        this.router.navigate(['projects'])
      })
    ).subscribe()
  }

}
