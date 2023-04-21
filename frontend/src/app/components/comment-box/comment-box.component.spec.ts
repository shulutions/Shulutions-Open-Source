import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';
import { CommentBoxComponent } from './comment-box.component';

fdescribe('CommentBoxComponent', () => {
  let component: CommentBoxComponent;
  let fixture: ComponentFixture<CommentBoxComponent>;
  let projectRequestService: jasmine.SpyObj<ProjectRequestService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProjectRequestService', ['comment']);

    await TestBed.configureTestingModule({
      declarations: [CommentBoxComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ProjectRequestService, useValue: spy }],
    }).compileComponents();

    projectRequestService = TestBed.inject(
      ProjectRequestService
    ) as jasmine.SpyObj<ProjectRequestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBoxComponent);
    component = fixture.componentInstance;
    component.projectRequestId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onComment when onSubmit is called', async () => {
    const comment = 'Test comment';
    const emittedComment = { id: 1, comment };
    projectRequestService.comment.and.returnValue(of(emittedComment));

    component.commentForm.get('comment')?.setValue(comment);
    fixture.detectChanges();

    spyOn(component.onComment, 'emit');

    await component.onSubmit();

    expect(component.onComment.emit).toHaveBeenCalledWith(emittedComment);
  });

  it('should not submit if the form is invalid', async () => {
    component.commentForm.get('comment')?.setValue('');
    fixture.detectChanges();

    spyOn(component.onComment, 'emit');

    await component.onSubmit();

    expect(component.onComment.emit).not.toHaveBeenCalled();
  });

  it('should not submit if the projectRequestId is not set', async () => {
    component.projectRequestId = undefined;
    fixture.detectChanges();

    spyOn(component.onComment, 'emit');

    await component.onSubmit();

    expect(component.onComment.emit).not.toHaveBeenCalled();
  });

  it('should clear the form after successful submit', async () => {
    const comment = 'Test comment';
    const emittedComment = { id: 1, comment };
    projectRequestService.comment.and.returnValue(of(emittedComment));

    component.commentForm.get('comment')?.setValue(comment);
    fixture.detectChanges();

    await component.onSubmit();

    expect(component.commentForm.get('comment')?.value).toBe('');
  });
});
