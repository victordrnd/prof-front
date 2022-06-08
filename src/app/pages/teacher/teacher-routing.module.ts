import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { LessonListComponent } from '../student/lesson-list/lesson-list.component';
import { TeacherProfileComponent } from './settings/teacher-profile/teacher-profile.component';
import { LessonDetailsComponent } from 'src/app/shared/_components/lesson-details/lesson-details.component';
import { BankInfoComponent } from './settings/bank-info/bank-info.component';



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
            component : BankInfoComponent
          }
        ]
      },
      {
        path : 'lessons',
        component : LessonListComponent
      },
      {
        path : 'lesson/:id',
        component : LessonDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
