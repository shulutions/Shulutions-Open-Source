import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './pages/update-user-profile/update-user-profile.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProjectsPageComponent,
    ProjectPreviewComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserProfileComponent,
    UpdateUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JwtHelperService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
