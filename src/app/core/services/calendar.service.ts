import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpCacheManager, withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient,
  private cache : HttpCacheManager ){ }


  getTimeTable(){
    return this.http.get(`${environment.apiUrl}/calendar/timetable`, {context : withCache({key : 'calendar'})})
  }

  getTwoUsersTimeTable(teacher_id){
    return this.http.post(`${environment.apiUrl}/calendar/teacher/timetable`, {teacher_id})
  }

  getMyAvailabilities(){
    return this.http.get(`${environment.apiUrl}/calendar/availabilities`, {context : withCache({key : 'availabilities'})});
  }

  saveAvailabilities(days){
    this.cache.delete('availabilities');
    return this.http.post(`${environment.apiUrl}/calendar/availabilities/save`, {days});
  }
}
