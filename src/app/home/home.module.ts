import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../shared/header/header.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonComponent, NbButtonModule } from '@nebular/theme';
import { HeadbandComponent } from './home/headband/headband.component';


@NgModule({
  declarations: [HomeComponent, HeadbandComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule
  ]
})
export class HomeModule { }
