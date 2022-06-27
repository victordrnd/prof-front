import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-create-collab-lesson-modal',
  templateUrl: './create-collab-lesson-modal.component.html',
  styleUrls: ['./create-collab-lesson-modal.component.scss']
})
export class CreateCollabLessonModalComponent implements OnInit {
  item;
  date;
  teacher;
  selectedSubject;
  selectedDuration = 1
  maxDuration;
  capacity = 4;
  rate = 30;
  currency = 'aed';
  success = false;
  constructor(private teacherService: TeacherService,
    private authService: AuthService,
    private lessonService : LessonService,
    private notificationService : NbToastrService,
    private translate : TranslateService,
    private modalRef : NzModalRef) { }

  async ngOnInit() {
    this.teacher = await this.teacherService.get(this.authService.currentUserValue.id).toPromise();
    if (this.teacher.teacher_subjects.length) {
      this.selectedSubject = this.teacher.teacher_subjects[0].subject.id;
    }
  }


  counter(len: number) {
    return Array.from({ length: len }, (_, i) => i + 1)
  }


  formatToolTip = (evt) => {
    return evt +" élèves"
  }


  confirm(){
    this.lessonService.createCollabLesson({
      rate : this.rate,
      currency : this.currency,
      duration : this.selectedDuration,
      subject_id : this.selectedSubject,
      scheduled_at : this.date.date.full + " " + this.item.time + ":00",
      capacity : this.capacity
    }).toPromise().then(res => {
      this.success = true;
      this.notificationService.success(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
      this.modalRef.close();
    }).catch(err => {
      for (const [key, value] of Object.entries(err.error)) {
        this.notificationService.danger(this.translate.instant('register.error.desc'), value)
      }
    })
  }


  cancel(){
    this.modalRef.close();
  }
}
