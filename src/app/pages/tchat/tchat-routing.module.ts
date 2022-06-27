import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { TchatComponent } from './tchat.component';

const routes: Routes = [
  {
    path : "",
    component : TchatComponent,
    canActivate : [AuthGuardService],
    children : [
      {
        path : "room/:id",
        component: RoomDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TchatRoutingModule { }
