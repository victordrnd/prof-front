import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpCacheManager, withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http : HttpClient,
    private cache : HttpCacheManager) { }

  public getMyLessons(filters){
    const params = new HttpParams({
      fromObject: filters
    });

    return this.http.get(`${environment.apiUrl}/lessons`, {params, context : withCache({key : 'lessons', ttl : 60})});
  }

  

  getHistory(filters){
    const params = new HttpParams({
      fromObject: filters
    });
    return this.http.get(`${environment.apiUrl}/lessons/history`, {params, context : withCache()});
  }

  find(lesson_id){
    return this.http.get(`${environment.apiUrl}/lessons/${lesson_id}`);
  }


  store(obj){
    this.cache.delete('lessons');
    this.cache.delete('calendar');
    return this.http.post(`${environment.apiUrl}/lessons`, {...obj});
  }

  createCollabLesson(obj){
    return this.http.post(`${environment.apiUrl}/teacher/lesson/create`, obj);
  }

  joinCollaborationLesson(lesson_id){
    return this.http.post(`${environment.apiUrl}/lessons/join/${lesson_id}`, {});
  }

  cancel(lesson_id){
    return this.http.delete(`${environment.apiUrl}/lessons/${lesson_id}`);
  }


  confirm(lesson_id){
    this.cache.delete('lessons');
    this.cache.delete('calendar');
    return this.http.put(`${environment.apiUrl}/teacher/lesson/confirm/${lesson_id}`, {});
  }


  update(lesson){
    return this.http.put(`${environment.apiUrl}/lessons/${lesson.id}`, lesson);
  }

}
