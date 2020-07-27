import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { NzTagModule, NzMenuModule, NzButtonModule, NzIconModule, NzDropDownModule, NzLayoutModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentComponent
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
    SharedModule
  ],
  bootstrap : [StudentComponent]
})
export class StudentModule { }
