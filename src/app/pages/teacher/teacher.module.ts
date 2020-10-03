import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { NbButtonModule } from '@nebular/theme';


@NgModule({
  declarations: [TeacherDashboardComponent, TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NbButtonModule
  ],
  bootstrap : [TeacherComponent]
})
export class TeacherModule { }
