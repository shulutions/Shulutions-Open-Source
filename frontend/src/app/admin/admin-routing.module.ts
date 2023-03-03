import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ManageProjectRequestComponent } from './pages/manage-project-request/manage-project-request.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CreateProjectComponent } from '../pages/create-project/create-project.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: OverviewComponent },
  { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: 'project-request/:id', component: ManageProjectRequestComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { 
    path: 'create-project', component: CreateProjectComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
