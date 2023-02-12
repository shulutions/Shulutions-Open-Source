import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestListComponent } from './project-request-list.component';

describe('ProjectRequestListComponent', () => {
  let component: ProjectRequestListComponent;
  let fixture: ComponentFixture<ProjectRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
