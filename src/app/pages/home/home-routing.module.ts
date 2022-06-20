import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultDashboardRedirectionComponent } from 'src/app/shared/_components/default-dashboard-redirection/default-dashboard-redirection.component';
import { DisputeFormComponent } from './disputes/dispute-form/dispute-form.component';
import { ForgotPasswordMailComponent } from './forgot-password-mail/forgot-password-mail.component';
import { HomeComponent } from './home/home.component';
import { HomeComponent as CustomHome} from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeacherProfileComponent } from './teachers-list/teacher-profile/teacher-profile.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';


const routes: Routes = [
  {
    path : "",
    component : CustomHome,
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
      },
      {
        path : 'forgot_password_mail',
        component : ForgotPasswordMailComponent
      },
      {
        path : 'reset_password',
        component : ResetPasswordComponent
      },
      {
        path : 'dashboard',
        component : DefaultDashboardRedirectionComponent
      },
      {
        path : 'dispute',
        children : [
          {
            path : "new/:id",
            component : DisputeFormComponent
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
export class HomeRoutingModule { }
