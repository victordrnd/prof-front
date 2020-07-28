import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';


const routes: Routes = [
  {
    path : "",
    component : TeacherComponent,
    canActivate: [AuthGuardService],
    children : [
      {
        path : "dashboard",
        component : TeacherDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }