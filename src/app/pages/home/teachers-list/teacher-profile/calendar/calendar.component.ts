import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'teacher-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() teacher;
  dates;
  color = [
    'warning',
    'primary',
    'danger',
    'success',
    'primary'
  ]
  constructor(private calendarService : CalendarService,
    private modalService : NzModalService) { }

  async ngOnInit() {
    this.dates = await this.calendarService.getTwoUsersTimeTable(this.teacher.id).toPromise();
    this.dates = Object.values(this.dates);
  }


  getLessonMarginTop(lesson){
    return (lesson.duration - 1) * 100 + 10
  }

  bookLesson(item, date, index){
    if(!date.hours[index].disabled){
      let maxDuration =0;
      while(maxDuration < date.hours.length - index && !date.hours[index+maxDuration].disabled){
        maxDuration++;
      }
      this.modalService.create({
        nzTitle : null,
        nzContent : BookingModalComponent,
        nzComponentParams : {item : item,date:date, teacher : this.teacher, maxDuration : maxDuration},
        nzOkText : "Confirmer",
        nzFooter : null,
      });
    }
  }
}
