import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { TimeoutError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-collab-lesson-details',
  templateUrl: './collab-lesson-details.component.html',
  styleUrls: ['./collab-lesson-details.component.scss']
})
export class CollabLessonDetailsComponent implements OnInit {
  lesson;
  loading = false;
  cardLoading = true;
  isTeacher;
  constructor(private route: ActivatedRoute,
    private notificationService: NbToastrService,
    private translate: TranslateService,
    private router: Router,
    private lessonService: LessonService) { }


  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.lesson = await this.lessonService.find(id).toPromise();
    this.cardLoading = false;
  }


  async joinLesson() {
    this.loading = true;
    await this.lessonService.joinCollaborationLesson(this.lesson.id).toPromise().then(res => {
      this.notificationService.primary(this.translate.instant("shared.success"), this.translate.instant('shared.success'));
      this.router.navigate(['student/dashboard']);
    }).catch(err => {
      if (err.error) {
        this.notificationService.danger(err.error.error, this.translate.instant('shared.error'))
      } else {
        for (const [key, value] of Object.entries(err)) {
          this.notificationService.danger(this.translate.instant('register.error.desc'), value)
        }
      }
    }).finally(() => this.loading = false);
  }
}
