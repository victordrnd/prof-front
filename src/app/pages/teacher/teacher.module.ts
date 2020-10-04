import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { NbAlertModule,  NbButtonModule,  NbIconModule,  NbLayoutModule } from '@nebular/theme';
import {  NzLayoutModule, NzListModule, NzMenuModule, NzModalModule, NzSelectModule} from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentModule } from '../student/student.module';


@NgModule({
  declarations: [TeacherDashboardComponent, TeacherComponent,],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NbButtonModule,
    NbAlertModule,
    NzListModule,
    NzModalModule,
    NzSelectModule,
    SharedModule,
    NbLayoutModule,
    NbIconModule,
    NzLayoutModule,
    NzMenuModule,
    StudentModule
  ],
  bootstrap : [TeacherComponent],
 
})
export class TeacherModule { }
