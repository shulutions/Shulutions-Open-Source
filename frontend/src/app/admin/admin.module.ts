import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProjectRequestListComponent } from './components/project-request-list/project-request-list.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';


@NgModule({
  declarations: [
    OverviewComponent,
    ProjectRequestListComponent,
    UsersComponent,
    TableComponent,
    ProjectTableComponent,
    EditProjectComponent,
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
