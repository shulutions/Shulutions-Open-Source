import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProjectRequestListComponent } from './components/project-request-list/project-request-list.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OverviewComponent,
    ProjectRequestListComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
