import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../shared/shared.module';
import { NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonComponent, NbButtonModule, NbCheckboxModule, NbRadioModule, NbToastrModule, NbAutocompleteModule, NbUserModule, NbLayoutModule, NbSidebarModule, NbAlertModule, NbDialogModule, NbPopoverModule } from '@nebular/theme';
import { HeadbandComponent } from './home/headband/headband.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTagModule, NzUploadModule, NzIconModule, NzCheckboxModule, NzRateModule, NzDividerModule, NzEmptyModule, NzListModule, NzTabsModule, NzModalModule, NzToolTipModule, NzSelectModule, NzMenuModule } from 'ng-zorro-antd';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';
import { LessonModalComponent } from './teachers-list/teacher-profile/calendar/lesson-modal/lesson-modal.component';
import {CalendarComponent as TeacherCalendar} from './teachers-list/teacher-profile/calendar/calendar.component';


@NgModule({
  declarations: [HomeComponent, HeadbandComponent, LoginComponent, RegisterComponent,  TeachersListComponent, TeacherProfileComponent, TeacherCalendar, LessonModalComponent],
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
    NbUserModule

  ],
  entryComponents : [LessonModalComponent]
})
export class HomeModule { }
