import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  lessons;
  constructor(private lessonService : LessonService) { }

  async ngOnInit() {
    this.lessons = await this.lessonService.getMyLessons().toPromise();
    console.log(this.lessons);
  }

}
