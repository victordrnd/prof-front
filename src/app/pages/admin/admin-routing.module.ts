import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/app/core/gards/admin-gards.service';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { ProfilComponent } from '../student/settings/profil/profil.component';
import { AdminComponent } from './admin.component';
import { DisputeDetailsComponent } from './disputes/dispute-details/dispute-details.component';
import { DisputesListComponent } from './disputes/disputes-list/disputes-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeacherProfileComponent } from './teachers/teacher-profile/teacher-profile.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';

const routes: Routes = [
  {
    path : "",
    component : AdminComponent,
    canActivate : [AdminGuardService],
    children : [
      {
        path : "",
        component : TeachersListComponent
      },
      {
        path : "teachers",
        children : [
          {
            path : "",
            component : TeachersListComponent
          },
          {
            path : ":id",
            component : TeacherProfileComponent
          }
        ]
      },
      {
        path : "students",
        children : [
          {
            path : "",
            component : StudentsListComponent
          },
          {
            path : ":id",
            component : StudentProfileComponent
          }
        ]
      },
      {
        path : "statistics",
        children : [
          {
            path : "",
            component : StatisticsComponent
          },
        ]
      },
      {
        path : "subjects",
        children : [
          {
            path : "",
            component : SubjectsComponent
          },
        ]
      },
      {
        path : "disputes",
        children : [
          {
            path :"",
            component : DisputesListComponent
          },
          {
            path :":id",
            component : DisputeDetailsComponent
          }
        ]
      },
      {
        path : "settings",
        children : [
          {
            path : "profile",
            component : ProfilComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
