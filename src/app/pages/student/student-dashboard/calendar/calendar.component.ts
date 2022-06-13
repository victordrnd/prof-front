import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CalendarService } from 'src/app/core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

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
    private router : Router) { }

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
}
