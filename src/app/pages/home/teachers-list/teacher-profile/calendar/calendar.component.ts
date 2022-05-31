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
    console.log(this.dates);
  }


  getLessonMarginTop(lesson){
    return (lesson.duration - 1) * 100
  }

  bookLesson(item, date, index){
    for(let j=index-1; j>=0; j--){
      for(let x=0; x <= date.hours[j].lessons.length; x++){
        if(date.hours[j].lessons[x]){
          if(date.hours[j].lessons[x].duration > index - j){
            return;
          }
        }
      }
    }
    if(date.hours[index].lessons.length == 0){
      let maxDuration =0;
      while(maxDuration < date.hours.length - index && date.hours[index+maxDuration].lessons.length == 0){
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
