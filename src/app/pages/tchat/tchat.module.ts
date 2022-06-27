import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TchatRoutingModule } from './tchat-routing.module';
import { TchatComponent } from './tchat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbChatModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RoomDetailsComponent } from './room-details/room-details.component';


@NgModule({
  declarations: [
    TchatComponent,
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    TchatRoutingModule,
    // SocketIoModule.forRoot(config),
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    NbLayoutModule,
    NbUserModule,
    NzDividerModule,
    NbChatModule
  ],
  bootstrap : [TchatComponent]
})
export class TchatModule { }
