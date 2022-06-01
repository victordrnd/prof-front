import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
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
    private router : Router) { }

  async ngOnInit() {
    this.lessons = await this.lessonService.getMyLessons().toPromise();
    console.log(this.lessons);
  }

  goToCourse(lesson){
    this.router.navigate([`/student/lesson/${lesson.id}`]);
  }


  async cancelLesson(lesson){
    await this.lessonService.cancel(lesson.id).toPromise().then(res => {
      this.toastrService.success(this.translate.instant('lesson.cancel.success_description'), this.translate.instant('lesson.cancel.success'));
    }).catch(err => {
      this.toastrService.danger("Error", "An error has occured");
    });
  }
}
