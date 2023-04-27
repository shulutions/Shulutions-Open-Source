import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { CreateProjectComponent } from './create-project.component';
import { ProjectService } from 'src/app/services/project-service/project.service';

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

fdescribe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [CreateProjectComponent],
      providers: [
        ProjectService,
        { provide: ElementRef, useClass: MockElementRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a valid project', () => {
    spyOn(projectService, 'createProject').and.callThrough();
  
    component.createProjectForm.setValue({
      id: null,
      title: 'Test Project',
      slug: null,
      description: 'This is a test project.',
      body: 'This is the body of the test project.',
      image: 'test-image.png',
    });
  
    component.onSubmit();
  
    expect(projectService.createProject).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Project',
        description: 'This is a test project.',
        body: 'This is the body of the test project.',
        image: 'test-image.png',
      })
    );
  });

  it('should not submit an invalid project', () => {
    spyOn(projectService, 'createProject').and.callThrough();

    component.createProjectForm.setValue({
      id: null,
      title: null,
      slug: null,
      description: 'This is a test project.',
      body: 'This is the body of the test project.',
      image: 'test-image.png',
    });

    component.onSubmit();

    expect(projectService.createProject).not.toHaveBeenCalled();
  });
});
