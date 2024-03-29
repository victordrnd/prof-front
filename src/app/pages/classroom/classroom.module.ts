import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';
import { CallControlsComponent } from './_components/call-controls/call-controls.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NbActionsModule, NbButtonModule, NbChatModule, NbContextMenuModule, NbIconModule, NbLayoutModule, NbMenuModule, NbMenuService, NbSpinnerModule } from '@nebular/theme';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    ClassroomComponent,
    CallControlsComponent
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    NzAvatarModule,
    NzCardModule,
    SharedModule,
    NzIconModule,
    NzDropDownModule,
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NzDrawerModule,
    NbChatModule,
    NbSpinnerModule,
    NbMenuModule, 
    NbContextMenuModule,
    LottieModule,
    NbIconModule
  ],
  providers : [NbMenuService]
  // bootstrap : [ClassroomComponent]
})
export class ClassroomModule { }
