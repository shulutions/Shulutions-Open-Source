import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectRequestFormComponent } from './project-request-form.component';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

fdescribe('ProjectRequestFormComponent', () => {
  let component: ProjectRequestFormComponent;
  let fixture: ComponentFixture<ProjectRequestFormComponent>;
  let projectRequestService: ProjectRequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ProjectRequestFormComponent],
      providers: [ProjectRequestService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestFormComponent);
    component = fixture.componentInstance;
    projectRequestService = TestBed.inject(ProjectRequestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a valid project request', () => {
    spyOn(projectRequestService, 'submitProjectRequest').and.callThrough();

    component.projectRequestForm.setValue({
      title: 'Test Project Request',
      description: 'This is a test project request.',
      skills: 'Angular, TypeScript',
      goals: 'Learn Angular',
      additionalInfo: 'This is additional info.',
    });

    component.onSubmit();

    expect(projectRequestService.submitProjectRequest).toHaveBeenCalledWith({
      title: 'Test Project Request',
      description: 'This is a test project request.',
      skills: 'Angular, TypeScript',
      goals: 'Learn Angular',
      additionalInfo: 'This is additional info.',
    });
  });

  it('should not submit an invalid project request', () => {
    spyOn(projectRequestService, 'submitProjectRequest').and.callThrough();

    component.projectRequestForm.setValue({
      title: null,
      description: null,
      skills: 'Angular, TypeScript',
      goals: 'Learn Angular',
      additionalInfo: 'This is additional info.',
    });

    component.onSubmit();

    expect(projectRequestService.submitProjectRequest).not.toHaveBeenCalled();
  });
});
