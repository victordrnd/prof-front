import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { LessonSettingsModalComponent } from '../lesson-settings-modal/lesson-settings-modal.component';
import { ChatService } from 'src/app/core/services/chat.service';
import { formatDate } from '@angular/common';
import { AddressService } from 'src/app/core/services/address.service';
@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent implements OnInit {
  lesson
  loading = true;
  isTeacher;
  date = new Date();
  isPast = false;

  paymentLoading = false;

 
  constructor(private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string,
    private lessonService: LessonService,
    private modalService: NzModalService,
    private translate: TranslateService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private notificationService: NbToastrService,
    private chatService: ChatService,
    private addressService : AddressService,
    private router: Router) { }

  async ngOnInit() {
    const lesson_id = this.route.snapshot.params.id;
    this.lesson = await this.lessonService.find(lesson_id).toPromise();
    this.loading = false;
    this.isTeacher = this.authService.currentUserValue.role.slug == "teacher";
    this.isPast = new Date() >= new Date(this.lesson.scheduled_at);
  }

  async acceptStudent(student) {
    await this.teacherService.acceptStudentLesson(student.id, this.lesson.id).toPromise().then(res => {
      this.lesson = res;
      this.notificationService.primary(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
    }).catch(err => {
      this.notificationService.danger(err.error, this.translate.instant('shared.error'))
    });
  }

  confirmLesson() {
    this.paymentLoading = true
    this.lessonService.confirm(this.lesson.id).toPromise().then((res: any) => {
      this.chatService.createRoom({ name: `Lesson ${formatDate(res.scheduled_at, "MMM d, h:mm a", this.locale)}`, users: res.students, lessonId: res.id }).toPromise().then(room => {
        this.chatService.emitNewRoomCreate(room);
        this.lesson = res;
        this.notificationService.primary(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
      });
    }).catch(err => {
      this.notificationService.danger(err.error, this.translate.instant('shared.error'))
    }).finally(() => this.paymentLoading = false);
  }


  async removeStudent(student) {

  }

  startDispute() {
    this.router.navigate(['/dispute/new/' + this.lesson.id]);
  }

  goToTeacherProfil() {
    this.router.navigate(['/teacher/profile/' + this.lesson.teacher_id]);

  }

  async joinCourse() {


    if (this.lesson.address) {
      window.open("https://www.google.com/maps/search/?api=1&query=" + this.lesson.address.address);
      return;
    }
    if (this.lesson.video_link) {
      window.open(this.lesson.video_link, "_blank");
      return;
    }
    if (this.lesson.capacity == 1 || this.lesson.students.length == 1) {
      window.open(`https://meet.master-classroom.com/${this.lesson.hash}?jwt=${localStorage.getItem('token')}`)
      // this.router.navigate([`/classroom/${this.lesson.id}`]);
    }
  }

  openSettingsModal() {
    const modalRef = this.modalService.create({
      nzContent: LessonSettingsModalComponent,
      nzComponentParams: { lesson: this.lesson },
      nzTitle: "Réglage du cours",
      nzOnOk: (component) => {
        this.lessonService.update(component.lesson).toPromise().then(res => {
          this.lesson = res;
          this.notificationService.primary(this.translate.instant('lesson.settings.updated_success'), this.translate.instant('shared.success'))
        }).catch(err => {
          this.notificationService.danger(this.translate.instant("lesson.settings.updated_success"), this.translate.instant('shared.error'));
        })
      }
    })
  }

  openCancelModal() {
    const modalRef = this.modalService.confirm({
      nzContent: this.translate.instant('lesson.cancel.confirm'),
      nzTitle: this.translate.instant('lesson.cancel.title'),
      nzOkText: this.translate.instant('lesson.cancel.ok'),
      nzOnOk: async () => {
        modalRef.updateConfig({
          nzOkLoading: true
        });
        await this.lessonService.cancel(this.lesson.id).toPromise().then(res => {
          this.router.navigate(["/dashboard"]);
          this.modalService.closeAll()
        }).catch(err => {
          modalRef.updateConfig({
            nzOkLoading: false
          });
        });
      }
    })
  }
}
