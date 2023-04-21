import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';
import { NavigationComponent } from './navigation.component';

fdescribe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authService: jasmine.SpyObj<AuthentificationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthentificationService', ['getUserRoles', 'logout', 'isAuthenticated']);

    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthentificationService, useValue: spy }],
    }).compileComponents();

    authService = TestBed.inject(
      AuthentificationService
    ) as jasmine.SpyObj<AuthentificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    authService.getUserRoles.and.returnValue([]);
    authService.isAuthenticated.and.returnValue(false); // Add this line
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateLinks on ngOnInit', () => {
    spyOn(component, 'generateLinks');

    component.ngOnInit();

    expect(component.generateLinks).toHaveBeenCalled();
  });

  it('should generate mainLinks with 3 items', () => {
      component.generateLinks();
      expect(component.mainLinks.length).toBe(3);
    });

  it('should generate protectedLinks with 1 item if user has "admin" role', () => {
    authService.getUserRoles.and.returnValue(['admin']);
    
    component.ngOnInit(); 
    component.generateLinks();
  
    console.log('User Roles:', component.userRoles);
    console.log('Protected Links:', component.protectedLinks);
  
    expect(component.protectedLinks.length).toBe(1);
  });
  
  it('should generate protectedLinks with 0 items if user does not have "admin" role', () => {
    authService.getUserRoles.and.returnValue(['user']);
    component.generateLinks();
    expect(component.protectedLinks.length).toBe(0);
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
