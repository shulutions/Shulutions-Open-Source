import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authService: AuthentificationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => null,
          },
        }),
        RouterTestingModule
      ],
      declarations: [ RegisterFormComponent ],  
      providers: [AuthentificationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthentificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid registration data', () => {
    spyOn(authService, 'register').and.callThrough();

    component.registerForm.setValue({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });
  });
});
