import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { LessonListComponent } from '../student/lesson-list/lesson-list.component';
import { PaymentComponent } from '../student/settings/payment/payment.component';
import { ProfilComponent } from '../student/settings/profil/profil.component';
import { TeacherProfileComponent } from './settings/teacher-profile/teacher-profile.component';



const routes: Routes = [
  {
    path : "",
    component : TeacherComponent,
    canActivate: [AuthGuardService],
    children : [
      {
        path : "dashboard",
        component : TeacherDashboardComponent,
        pathMatch : "full",
      },
      {
        path : 'settings',
        children : [
          {
            path : 'profil',
            component : TeacherProfileComponent
          },
          {
            path : 'payments',
            component : PaymentComponent
          }
        ]
      },
      {
        path : 'lessons',
        component : LessonListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
