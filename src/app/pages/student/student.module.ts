import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './student-dashboard/calendar/calendar.component';
import { NbAlertModule, NbUserModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbToastrModule, NbFormFieldModule, NbLayoutModule, NbSpinnerModule, NbCheckboxModule, NbRadioModule, NbAutocompleteModule, NbTagModule, NbTooltipModule, NbPopoverModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
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
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ProfilComponent } from './settings/profil/profil.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
const config: SocketIoConfig = { url: environment.chatServer, options: { transports: ['websocket'] } };
@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentComponent,
    CalendarComponent,
    PaymentComponent,
    AddPaymentComponent,
    LessonListComponent,
    ProfilComponent,
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
    NzDropDownModule,
    NbLayoutModule,
    NzPopconfirmModule,
    NgxStripeModule.forChild(environment.publicStripeKey),
    NzSpinModule,
    NbCheckboxModule,
    NbRadioModule,
    NzUploadModule,
    NbAutocompleteModule,
    NbTagModule,
    TranslateModule,
    NbTooltipModule,
    NbPopoverModule,
    NbSpinnerModule,
    NzDatePickerModule,
    NzSelectModule
    // SocketIoModule.forRoot(config)
    ],
  bootstrap : [StudentComponent],
  exports : [CalendarComponent, LessonListComponent, ProfilComponent, AddPaymentComponent],
  entryComponents : [
    AddPaymentComponent
  ]
})
export class StudentModule { }
