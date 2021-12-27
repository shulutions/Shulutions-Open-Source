import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsPageComponent } from './components/project/projects-page/projects-page.component';
import { ProjectsComponent } from './components/project/projects/projects.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { ViewProjectComponent } from './components/project/view-project/view-project.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects-page', component: ProjectsPageComponent },
  {
    path: 'users', children: [
      {
        path: '', component: UsersComponent
      },
      {
        path: ':id', component: UserProfileComponent
      }
    ]
  },
  { path: 'update-profile', component: UpdateUserProfileComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent },
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ViewProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
