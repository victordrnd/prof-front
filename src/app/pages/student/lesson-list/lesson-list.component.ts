import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { StatusService } from 'src/app/core/services/status.service';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  lessons : any= {};
  loading = true;
  title;
  type;
  date = new Date();
  filters = {
    status_id : null,
    page : 1,
    date : null,
    subject_id : null
  }

  statuses;
  subjects;
  constructor(private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private authService: AuthService,
    private statusService : StatusService,
    private subjectService : SubjectService,
    private router: Router) { }

  async ngOnInit() {
    this.title = (this.activatedRoute.snapshot.data as any).title;
    this.type = (this.activatedRoute.snapshot.data as any).type;
    this.getLessons();
    this.statuses = await this.statusService.getLessonStatus().toPromise();
    this.subjects = await this.subjectService.getAll().toPromise();
  }

  async getLessons(key = null, value = null) {
    if(key){
      this.filters[key] = value;
      if(key =='date' && value != null){
        this.filters['date'] = new Date(value).toDateString();
      }
    }
    if (this.type == "coming") {
      this.lessons = await this.lessonService.getMyLessons(this.filters).toPromise();
    } else {
      this.lessons = await this.lessonService.getHistory(this.filters).toPromise();
    }
    this.loading = false;
  }

  goToCourse(lesson) {
    if (this.authService.currentUserValue.role.slug == "teacher") {
      this.router.navigate([`/teacher/lessons/${lesson.id}`]);
    } else {
      this.router.navigate([`/student/lessons/${lesson.id}`]);
    }
  }


  async cancelLesson(lesson) {
    await this.lessonService.cancel(lesson.id).toPromise().then(res => {
      this.toastrService.primary(this.translate.instant('lesson.cancel.success_description'), this.translate.instant('lesson.cancel.success'));
      this.getLessons();
    }).catch(err => {
      this.toastrService.danger("Error", "An error has occured");
    });
  }


  async onPageIndexChange(page) {
    this.getLessons('page', page);
  }
}
