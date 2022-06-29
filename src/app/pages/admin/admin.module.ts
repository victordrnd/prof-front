import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NbButtonModule, NbCardModule, NbChatModule, NbIconModule, NbLayoutModule, NbSpinnerModule, NbTagModule, NbToastrModule } from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StudentModule } from '../student/student.module';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TeacherProfileComponent } from './teachers/teacher-profile/teacher-profile.component';
import { HomeModule } from '../home/home.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DisputesListComponent } from './disputes/disputes-list/disputes-list.component';
import { DisputeDetailsComponent } from './disputes/dispute-details/dispute-details.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    AdminComponent,
    TeachersListComponent,
    TeacherProfileComponent,
    DisputesListComponent,
    DisputeDetailsComponent,
    StudentsListComponent,
    StudentProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzSliderModule,
    NzLayoutModule,
    NbLayoutModule,
    SharedModule,
    NzMenuModule,
    NzIconModule,
    StudentModule,
    NzTableModule,
    NzAvatarModule,
    NbTagModule,
    HomeModule,
    NbSpinnerModule,
    NzDividerModule,
    NbIconModule,
    NbToastrModule,
    NbButtonModule,
    NzSwitchModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NbCardModule,
    NbChatModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzMenuModule,
    NzTagModule,
    NzButtonModule,
    NzDatePickerModule
  ],
  bootstrap : [AdminComponent]
})
export class AdminModule { }
