import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  today = new Date();
  dates = [
    {
      date : this.today.getDate(),
      month : "July"
    },
    {
      date : this.today.getDate() + 1,
      month : "July"
    },
    {
      date : this.today.getDate() + 2,
      month : "July"
    },
    {
      date : this.today.getDate() + 3,
      month : "July"
    },
    {
      date : "01",
      month : "Aug"
    },
    {
      date : "02",
      month : "Aug"
    },
    {
      date : "03",
      month : "Aug"
    }
  ];
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
