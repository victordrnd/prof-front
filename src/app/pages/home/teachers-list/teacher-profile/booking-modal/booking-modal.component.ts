import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LessonService } from '../../../../../core/services/lesson.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AddPaymentComponent } from 'src/app/pages/student/settings/payment/add-payment/add-payment.component';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'teacher-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  item;
  date;
  teacher;
  selectedSubject;
  selectedDuration = 1
  maxDuration;
  constructor(private modalService: NzModalService,
    private lessonService: LessonService,
    private paymentService: PaymentService,
    private translate: TranslateService,
    private notificationService: NbToastrService,
    private router: Router) { }

  ngOnInit() {
    if (this.teacher.teacher_subjects.length) {
      this.selectedSubject = this.teacher.teacher_subjects[0].subject.id;
    }
  }


  counter(i: number) {
    let arr = [];
    for (let j = 1; j <= i; j++) {
      arr.push(j);
    }
    return arr;
  }


  async confirm() {
    const obj = {
      subject_id: this.selectedSubject,
      duration: this.selectedDuration,
      teacher_id: this.teacher.id,
      scheduled_at: this.date.detail + " " + this.item.time + ":00"
    }
    try {
      await this.lessonService.store(obj).toPromise().then(res => {
        this.modalService.closeAll();
        this.notificationService.success(this.translate.instant('lesson.success_description'), this.translate.instant('shared.success'));
        this.router.navigate(['student/dashboard']);
      }).catch(err => {
        if (err.status == 401) {
          const modalref = this.modalService.create({
            nzContent: AddPaymentComponent,
            nzTitle: this.translate.instant('payment.add'),
            nzFooter: null
          });
          modalref.afterClose.subscribe(() => {
            if(modalref.componentInstance.success){
              this.confirm();
            }
          })
        }else{
          this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'));
        }
      });
    } catch (e) {
      console.error(e)
    }
  }


  cancel() {
    this.modalService.closeAll();
  }
}
