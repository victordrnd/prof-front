import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TchatRoutingModule } from './tchat-routing.module';
import { TchatComponent } from './tchat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbBadgeModule, NbButtonModule, NbChatModule, NbIconModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { LottieModule } from 'ngx-lottie';


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
    NbChatModule,
    NbBadgeModule,
    NbIconModule,
    NbButtonModule,
    NzEmptyModule,
    LottieModule
  ],
  exports: [RoomDetailsComponent],
  bootstrap: [TchatComponent]
})
export class TchatModule { }
