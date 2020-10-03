import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient) { }


  getTimeTable(){
    return this.http.get(`${environment.apiUrl}/calendar/timetable`)
  }

  getTwoUsersTimeTable(teacher_id){
    return this.http.post(`${environment.apiUrl}/calendar/teacher/timetable`, {teacher_id})
  }
}
