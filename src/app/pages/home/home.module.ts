import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../shared/shared.module';
import { NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonComponent, NbButtonModule, NbCheckboxModule, NbRadioModule, NbToastrModule, NbAutocompleteModule, NbUserModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { HeadbandComponent } from './home/headband/headband.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTagModule, NzUploadModule, NzIconModule, NzCheckboxModule, NzRateModule } from 'ng-zorro-antd';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';


@NgModule({
  declarations: [HomeComponent, HeadbandComponent, LoginComponent, RegisterComponent, TeachersListComponent, TeacherProfileComponent],
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
    NbUserModule,
    NbLayoutModule,
    NzCheckboxModule,
    NzRateModule,
    NbSidebarModule.forRoot(),
    NbAutocompleteModule,
    NzTagModule,
    NzUploadModule,
    NzIconModule

  ]
})
export class HomeModule { }
