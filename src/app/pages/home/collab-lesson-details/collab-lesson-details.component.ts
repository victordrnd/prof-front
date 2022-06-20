import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-collab-lesson-details',
  templateUrl: './collab-lesson-details.component.html',
  styleUrls: ['./collab-lesson-details.component.scss']
})
export class CollabLessonDetailsComponent implements OnInit {
  lesson;

  constructor(private route: ActivatedRoute,
    private lessonService: LessonService) { }
  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.lesson = await this.lessonService.find(id).toPromise();
  }



  joinLesson() {
    this.lessonService.joinCollaborationLesson(this.lesson.id)
  }
}
