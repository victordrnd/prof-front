import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { StatusService } from 'src/app/core/services/status.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { ChatService } from 'src/app/core/services/chat.service';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  student_id;
  lessons;
  loading = true;
  date = new Date();
  filters = {
    status_id: null,
    page: 1,
    date: null,
    subject_id: null
  }
  statuses;
  subjects;

  constructor(private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private authService: AuthService,
    private statusService: StatusService,
    private chatService: ChatService,
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  async ngOnInit() {
    this.student_id = this.route.snapshot.params.id;
    this.getLessons();
    this.statuses = await this.statusService.getLessonStatus().toPromise();
    this.subjects = await this.subjectService.getAll().toPromise();
  }

  async getLessons(key = null, value = null) {
    if (key) {
      this.filters[key] = value;
      if (key == 'date' && value != null) {
        this.filters['date'] = new Date(value).toDateString();
      }
    }
    this.lessons = await this.lessonService.getAllStudentsLessons(this.filters, this.student_id).toPromise();
    this.loading = false;
    console.log(this.lessons)
  }

  async onPageIndexChange(page) {
    this.getLessons('page', page);
  }

  async cancelLesson(lesson) {
    await this.lessonService.cancel(lesson.id).toPromise().then(res => {
      this.toastrService.success(this.translate.instant('lesson.cancel.success_description'), this.translate.instant('lesson.cancel.success'));
      this.getLessons();
    }).catch(err => {
      this.toastrService.danger("Error", "An error has occured");
    });
  }

  async chatWithStudent() {
    //en attente serveur chat
    // await this.chatService.createRoom().toPromise().then(res => {

    // }).catch(err => {
    //   this.toastrService.danger("Error", "An error has occured");
    // });
  }
}

