import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent as CustomHome } from './home.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonComponent, NbButtonModule, NbCheckboxModule, NbRadioModule, NbToastrModule, NbAutocompleteModule, NbUserModule, NbLayoutModule, NbSidebarModule, NbAlertModule, NbDialogModule, NbPopoverModule, NbSelectModule, NbTagModule, NbSpinnerModule, NbDatepickerModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { HeadbandComponent } from './home/headband/headband.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';
import { BookingModalComponent } from './teachers-list/teacher-profile/booking-modal/booking-modal.component';
import {CalendarComponent as TeacherCalendar} from './teachers-list/teacher-profile/calendar/calendar.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { TranslateModule } from '@ngx-translate/core';
import { StudentModule } from '../student/student.module';
import { DisputeFormComponent } from './disputes/dispute-form/dispute-form.component';
import { CollabLessonDetailsComponent } from './collab-lesson-details/collab-lesson-details.component';
import { ForgotPasswordMailComponent } from './forgot-password-mail/forgot-password-mail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeacherModule } from '../teacher/teacher.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
@NgModule({
  declarations: [HomeComponent, HeadbandComponent, LoginComponent, RegisterComponent,  TeachersListComponent, TeacherProfileComponent, TeacherCalendar, BookingModalComponent, DisputeFormComponent, CustomHome, CollabLessonDetailsComponent,ForgotPasswordMailComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbRadioModule,
    NbLayoutModule,
    NbAutocompleteModule,
    NzTagModule,
    NzUploadModule,
    NzIconModule,
    NbAutocompleteModule,
    NbSidebarModule.forRoot(),
    NzCheckboxModule,
    NzListModule,
    NzTabsModule,
    NzDividerModule,
    NzEmptyModule,
    NzMenuModule,
    NbPopoverModule,
    NzSelectModule,
    NbAlertModule,
    NbUserModule,
    NzModalModule,
    NbSelectModule,
    NzCommentModule,
    NzAvatarModule,
    NzRateModule,
    StudentModule,
    NbTagModule,
    NbCardModule,
    NbSpinnerModule,
    TeacherModule,
    NzSwitchModule,
    NzInputModule,
    NzAutocompleteModule,
    NbDatepickerModule
  ],
  exports : [TeacherProfileComponent],
  entryComponents : [BookingModalComponent],
  providers : [
    {
      provide:NB_TIME_PICKER_CONFIG,
      useValue:{}
      }
  ],
  bootstrap : [CustomHome]
})
export class HomeModule { }
