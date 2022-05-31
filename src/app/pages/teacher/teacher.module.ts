import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { NbAlertModule,  NbButtonModule,  NbIconModule,  NbLayoutModule } from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentModule } from '../student/student.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
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
