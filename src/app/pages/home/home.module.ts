import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../shared/shared.module';
import { NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonComponent, NbButtonModule, NbCheckboxModule, NbRadioModule, NbToastrModule, NbAutocompleteModule } from '@nebular/theme';
import { HeadbandComponent } from './home/headband/headband.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, HeadbandComponent, LoginComponent, RegisterComponent],
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
    NbToastrModule.forRoot(),
    NbAutocompleteModule

  ]
})
export class HomeModule { }
