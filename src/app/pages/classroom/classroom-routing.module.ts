import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { ClassroomComponent } from './classroom.component';

const routes: Routes = [
  {
    path : ":id",
    component : ClassroomComponent,
    canActivate : [AuthGuardService]
    // children: [
    //   {
    //     path : ":id",
    //     component : ClassroomComponent
    //   }
    // ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
