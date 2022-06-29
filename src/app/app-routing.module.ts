import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'teacher',
    loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule),
  },
  {
    path : "admin",
    loadChildren : () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path : "messages",
    loadChildren : () => import('./pages/tchat/tchat.module').then(m => m.TchatModule)
  },
  {
    path : "classroom",
    loadChildren : () => import('./pages/classroom/classroom.module').then(m => m.ClassroomModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
