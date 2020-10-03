import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';


const routes: Routes = [
  {
    path : "",
    children : [
      {
        path : '',
        component : HomeComponent
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
        path : 'login',
        component : LoginComponent
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
