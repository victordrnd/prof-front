import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  lessons;
  constructor(private lessonService : LessonService, 
    private toastrService: NbToastrService,
    private translate : TranslateService,
    private authService : AuthService,
    private router : Router) { }

  async ngOnInit() {
    this.getLessons();
  }

  async getLessons(){
    this.lessons = await this.lessonService.getMyLessons().toPromise();
  }

  goToCourse(lesson){
    if(this.authService.currentUserValue.role.slug == "teacher"){
      this.router.navigate([`/teacher/lesson/${lesson.id}`]);
    }else{
      this.router.navigate([`/student/lesson/${lesson.id}`]);
    }
  }


  async cancelLesson(lesson){
    await this.lessonService.cancel(lesson.id).toPromise().then(res => {
      this.toastrService.success(this.translate.instant('lesson.cancel.success_description'), this.translate.instant('lesson.cancel.success'));
      this.getLessons();
    }).catch(err => {
      this.toastrService.danger("Error", "An error has occured");
    });
  }
}
