import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';


@NgModule({
  declarations: [TeacherDashboardComponent, TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ],
  bootstrap : [TeacherComponent]
})
export class TeacherModule { }
