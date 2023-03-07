import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIdeaComponent } from './project-idea.component';

describe('ProjectIdeaComponent', () => {
  let component: ProjectIdeaComponent;
  let fixture: ComponentFixture<ProjectIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectIdeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
