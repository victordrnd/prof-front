import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http : HttpClient) { }

  public getMyLessons(page = 1){
    return this.http.get(`${environment.apiUrl}/lessons`);
  }

  getHistory(page=1){
    return this.http.get(`${environment.apiUrl}/lessons/history?page=${page}`);
  }

  find(lesson_id){
    return this.http.get(`${environment.apiUrl}/lessons/${lesson_id}`);
  }

  
  store(obj){
    return this.http.post(`${environment.apiUrl}/lessons`, {...obj});
  }


  cancel(lesson_id){
    return this.http.delete(`${environment.apiUrl}/lessons/${lesson_id}`);
  }


  confirm(lesson_id){
    return this.http.put(`${environment.apiUrl}/teacher/lesson/confirm/${lesson_id}`, {});
  }


  update(lesson){
    return this.http.put(`${environment.apiUrl}/lessons/${lesson.id}`, lesson);
  }

}
