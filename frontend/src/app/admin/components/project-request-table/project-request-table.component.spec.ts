import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestTableComponent } from './project-request-table.component';

describe('ProjectRequestTableComponent', () => {
  let component: ProjectRequestTableComponent;
  let fixture: ComponentFixture<ProjectRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
