import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';


const routes: Routes = [
  {
    path : "",
    children : [
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'search',
        component : TeachersListComponent
      },
      {
        path : 'teacher/profile/:id',
        component : TeacherProfileComponent
      },
      {
        path : 'register',
        component : RegisterComponent
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
