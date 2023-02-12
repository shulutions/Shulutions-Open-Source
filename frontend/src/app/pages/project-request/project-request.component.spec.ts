import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestComponent } from './project-request.component';

describe('ProjectRequestComponent', () => {
  let component: ProjectRequestComponent;
  let fixture: ComponentFixture<ProjectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
