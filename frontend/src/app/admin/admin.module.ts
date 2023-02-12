import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProjectRequestListComponent } from './components/project-request-list/project-request-list.component';


@NgModule({
  declarations: [
    OverviewComponent,
    ProjectRequestListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
