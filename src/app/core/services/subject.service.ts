import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get(`${environment.apiUrl}/subject/all`);
  }

  getMyTeachedSubjects(){
    return this.http.get(`${environment.apiUrl}/teacher/subjects/my`);
  }

  updateMyTeachedSubjects(subjects){
    return this.http.put(`${environment.apiUrl}/teacher/subjects/my`, {subjects});
  }

  deleteTeachedSubject(subject_id){
    return this.http.delete(`${environment.apiUrl}/teacher/subjects/${subject_id}`);
  }
}
