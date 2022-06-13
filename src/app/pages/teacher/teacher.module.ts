import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { NbAlertModule,  NbButtonModule,  NbCardModule,  NbFormFieldModule,  NbIconModule,  NbInputModule,  NbLayoutModule, NbSelectModule, NbTagModule } from '@nebular/theme';
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
import { BankInfoComponent } from './settings/bank-info/bank-info.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DiplomaUploadComponent } from './settings/diploma-upload/diploma-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.socketServer, options: { transports: ['websocket'] } };
@NgModule({
  declarations: [TeacherDashboardComponent, TeacherComponent, TeacherProfileComponent, AddSubjectsModalComponent, BankInfoComponent, DiplomaUploadComponent,],
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
    NbFormFieldModule,
    NzSpinModule,
    NzUploadModule,
    NzIconModule,
    NzTableModule,
    NbTagModule,
    // SocketIoModule.forRoot(config)
  ],
  bootstrap : [TeacherComponent],
 
})
export class TeacherModule { }
