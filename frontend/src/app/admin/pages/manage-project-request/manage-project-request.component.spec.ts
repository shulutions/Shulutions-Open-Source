import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectRequestComponent } from './manage-project-request.component';

describe('ManageProjectRequestComponent', () => {
  let component: ManageProjectRequestComponent;
  let fixture: ComponentFixture<ManageProjectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
