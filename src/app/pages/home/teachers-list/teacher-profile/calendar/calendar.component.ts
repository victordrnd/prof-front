import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'teacher-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() teacher;
  @Input() subject_id;
  dates;
  color = [
    'warning',
    'primary',
    'danger',
    'success',
    'primary'
  ]
  subscriptions : Subscription[]= [];
  constructor(private calendarService : CalendarService,
    private authService : AuthService,
    private router : Router,
    private modalService : NzModalService) { }
  

  async ngOnInit() {
    this.authService.populate();
    this.dates = await this.calendarService.getTwoUsersTimeTable(this.teacher.id).toPromise();
    this.dates = Object.values(this.dates);
  }


  getLessonMarginTop(lesson){
    return (lesson.duration - 1) * 100 + 20
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
        nzComponentParams : {item : item,date:date, teacher : this.teacher, maxDuration : maxDuration, subject_id : this.subject_id},
        nzOkText : "Confirmer",
        nzFooter : null,
      });
    }
  }


  displayLesson(lesson){
    const sb = this.authService.isAuthenticated.subscribe(isAuthenticated => {
      if(!isAuthenticated){
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['lesson/collab/'+lesson.id]);
      }
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(el => el.unsubscribe())
  }
}

