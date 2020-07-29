import { Component, OnInit } from '@angular/core';
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
  constructor(private calendarService : CalendarService) { }

  async ngOnInit() {
    this.dates = await this.calendarService.getTimeTable().toPromise();
    this.dates = Object.values(this.dates);
    console.log(this.dates);
  }


  getLessonMarginTop(lesson){
    return (lesson.duration - 1) * 110
  }

}
