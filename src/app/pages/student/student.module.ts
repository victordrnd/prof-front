import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './student-dashboard/calendar/calendar.component';
import { NbAlertModule, NbUserModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbToastrModule, NbFormFieldModule } from '@nebular/theme';
import { PaymentComponent } from './settings/payment/payment.component';
import { AddPaymentComponent } from './settings/payment/add-payment/add-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
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
    NbFormFieldModule,
    NzDropDownModule
    ],
  bootstrap : [StudentComponent],
  exports : [CalendarComponent],
  entryComponents : [
    AddPaymentComponent
  ]
})
export class StudentModule { }
