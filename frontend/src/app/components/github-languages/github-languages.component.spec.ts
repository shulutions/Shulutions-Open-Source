import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubLanguagesComponent } from './github-languages.component';

describe('GithubLanguagesComponent', () => {
  let component: GithubLanguagesComponent;
  let fixture: ComponentFixture<GithubLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
