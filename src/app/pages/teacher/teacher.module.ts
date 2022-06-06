import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { NbAlertModule,  NbButtonModule,  NbCardModule,  NbFormFieldModule,  NbIconModule,  NbInputModule,  NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentModule } from '../student/student.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TeacherProfileComponent } from './settings/teacher-profile/teacher-profile.component';
import { AddSubjectsModalComponent } from './settings/_components/add-subjects-modal/add-subjects-modal.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@NgModule({
  declarations: [TeacherDashboardComponent, TeacherComponent, TeacherProfileComponent, AddSubjectsModalComponent,],
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
    StudentModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NzPopconfirmModule,
    NbFormFieldModule
  ],
  bootstrap : [TeacherComponent],
 
})
export class TeacherModule { }
