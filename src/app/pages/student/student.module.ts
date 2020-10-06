import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { NzTagModule, NzMenuModule, NzButtonModule, NzIconModule, NzDropDownModule, NzLayoutModule, NzCalendarModule, NzBadgeModule, NzTabsModule, NzListModule, NzEmptyModule, NzTableModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './student-dashboard/calendar/calendar.component';
import { NbAlertModule, NbUserModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbToastrModule, NbFormFieldModule } from '@nebular/theme';
import { PaymentComponent } from './settings/payment/payment.component';
import { AddPaymentComponent } from './settings/payment/add-payment/add-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonListComponent } from './lesson-list/lesson-list.component';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentComponent,
    CalendarComponent,
    PaymentComponent,
    AddPaymentComponent,
    LessonListComponent
    ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTagModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzLayoutModule,
    SharedModule,
    NzTabsModule,
    NzListModule,
    NbAlertModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbToastrModule,
    NzEmptyModule,
    NzTableModule,
    NbFormFieldModule 
    ],
  bootstrap : [StudentComponent],
  exports : [CalendarComponent],
  entryComponents : [
    AddPaymentComponent
  ]
})
export class StudentModule { }
