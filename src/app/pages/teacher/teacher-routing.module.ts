import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { LessonListComponent } from '../student/lesson-list/lesson-list.component';
import { TeacherProfileComponent } from './settings/teacher-profile/teacher-profile.component';
import { LessonDetailsComponent } from 'src/app/shared/_components/lesson-details/lesson-details.component';
import { BankInfoComponent } from './settings/bank-info/bank-info.component';
import { DiplomaUploadComponent } from './settings/diploma-upload/diploma-upload.component';
import { TeacherAvailabilitiesComponent } from './settings/teacher-availabilities/teacher-availabilities.component';
import { TeacherGuardService } from 'src/app/core/gards/teacher-guards.service';



const routes: Routes = [
  {
    path : "",
    component : TeacherComponent,
    canActivate: [AuthGuardService, TeacherGuardService],
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
          },
          {
            path : "diploma",
            component : DiplomaUploadComponent
          },
          {
            path :"availabilities",
            component : TeacherAvailabilitiesComponent
          }
        ]
      },
      
      {
        path : "lessons",
        children : [
          {
            path : '',
            component : LessonListComponent,
            data : {
              type : "coming",
              title : "lesson.coming"
            }
          },
          {
            path : "history",
            component : LessonListComponent,
            data : {
              type : "history",
              title : "lesson.history"
            } 
          },
          {
            path : ':id',
            component : LessonDetailsComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
