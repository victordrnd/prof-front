import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http : HttpClient) { }

  public getMyLessons(filters){
    const params = new HttpParams({
      fromObject: filters
    });

    return this.http.get(`${environment.apiUrl}/lessons`, {params});
  }

  public getAllStudentsLessons(filters, student_id){
    const params = new HttpParams({
      fromObject: filters
    });
    return this.http.get(`${environment.apiUrl}/admin/students/${student_id}/all-lessons`, {params});
  }

  getHistory(filters){
    const params = new HttpParams({
      fromObject: filters
    });
    return this.http.get(`${environment.apiUrl}/lessons/history`, {params});
  }

  find(lesson_id){
    return this.http.get(`${environment.apiUrl}/lessons/${lesson_id}`);
  }


  store(obj){
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
    return this.http.put(`${environment.apiUrl}/teacher/lesson/confirm/${lesson_id}`, {});
  }


  update(lesson){
    return this.http.put(`${environment.apiUrl}/lessons/${lesson.id}`, lesson);
  }

}
