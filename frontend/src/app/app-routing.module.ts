import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateUserProfileComponent } from './pages/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersComponent } from './pages/users/users.component';

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
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
