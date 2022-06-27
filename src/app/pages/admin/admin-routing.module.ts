import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/app/core/gards/admin-gards.service';
import { AuthGuardService } from 'src/app/core/gards/auth-gards.service';
import { ProfilComponent } from '../student/settings/profil/profil.component';
import { AdminComponent } from './admin.component';
import { DisputeDetailsComponent } from './disputes/dispute-details/dispute-details.component';
import { DisputesListComponent } from './disputes/disputes-list/disputes-list.component';
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