import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { CreateCollabLessonModalComponent } from 'src/app/shared/_components/create-collab-lesson-modal/create-collab-lesson-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() isTeacher = false;
  dates;
  color = [
    'warning',
    'primary',
    'danger',
    'success',
    'primary'
  ]
  constructor(private calendarService : CalendarService,
    private authService : AuthService,
    private router : Router,
    private modalService : NzModalService) { }

  async ngOnInit() {
    this.dates = await this.calendarService.getTimeTable().toPromise();
    this.dates = Object.values(this.dates);
  }


  getLessonMarginTop(lesson){
    return (lesson.duration - 1) * 115 
  }

  getHeight(lesson){
    return lesson.duration * 110 + ((lesson.duration-1) * 5)
  }

  displayLesson(lesson){
    if(this.authService.currentUserValue.role.slug == "teacher"){
      this.router.navigate([`/teacher/lessons/${lesson.id}`]);
    }else{
      this.router.navigate([`/student/lessons/${lesson.id}`]);
    }

  }


  bookCollabLesson(item, date, index){
    if(item?.disabled || !this.isTeacher){
      return;
    }
    if(!date.hours[index].disabled){
      let maxDuration =0;
      while(maxDuration < date.hours.length - index && !date.hours[index+maxDuration].disabled){
        maxDuration++;
      }
      const modalRef = this.modalService.create({
        nzTitle : null,
        nzContent : CreateCollabLessonModalComponent,
        nzComponentParams : {item : item, date:date, maxDuration : maxDuration},
        nzOkText : "Confirmer",
        nzMaskClosable : false,
        nzFooter : null,
      });
      const sb = modalRef.afterClose.subscribe(async evt => {
        if(modalRef.componentInstance.success){
          this.dates = await this.calendarService.getTimeTable().toPromise();
          this.dates = Object.values(this.dates);
          sb.unsubscribe();
        }
      }) 
    }
  }
}
