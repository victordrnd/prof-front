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
@NgModule({
  declarations: [HomeComponent, HeadbandComponent, LoginComponent, RegisterComponent,  TeachersListComponent, TeacherProfileComponent, TeacherCalendar, BookingModalComponent],
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
    NzModalModule

  ],
  entryComponents : [BookingModalComponent]
})
export class HomeModule { }
