import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { NzTagModule, NzMenuModule, NzButtonModule, NzIconModule, NzDropDownModule, NzLayoutModule, NzCalendarModule, NzBadgeModule, NzTabsModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './student-dashboard/calendar/calendar.component';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentComponent,
    CalendarComponent
    ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NzTagModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzLayoutModule,
    SharedModule,
    NzTabsModule
  ],
  bootstrap : [StudentComponent]
})
export class StudentModule { }
