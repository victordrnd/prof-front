import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { PaymentComponent } from './settings/payment/payment.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailsComponent } from 'src/app/shared/_components/lesson-details/lesson-details.component';


const routes: Routes = [
  {
    path : "",
    component : StudentComponent,
    canActivate: [AuthGuardService],
    children : [
      {
        path : "dashboard",
        component : StudentDashboardComponent
      },
      {
        path : 'settings',
        children : [
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
export class StudentRoutingModule { }
