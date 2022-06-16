import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-dispute-form',
  templateUrl: './dispute-form.component.html',
  styleUrls: ['./dispute-form.component.scss']
})
export class DisputeFormComponent implements OnInit {
  lesson
  constructor(private activatedRoute: ActivatedRoute,
    private lessonService: LessonService) { }

  async ngOnInit() {
    const lesson_id = this.activatedRoute.snapshot.params.id;

    this.lesson = await this.lessonService.find(lesson_id).toPromise();
    console.log(this.lesson);
  }

}
