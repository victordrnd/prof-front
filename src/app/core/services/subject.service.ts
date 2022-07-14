import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpCacheManager, withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http : HttpClient,
    private cache : HttpCacheManager) { }

  getAll(){
    return this.http.get(`${environment.apiUrl}/subject/all`, {context :  withCache()});
  }

  getMyTeachedSubjects(){
    return this.http.get(`${environment.apiUrl}/teacher/subjects/my`, {context : withCache({key : "my_subjects"})});
  }

  updateMyTeachedSubjects(subjects){
    this.cache.delete('my_subjects');
    return this.http.put(`${environment.apiUrl}/teacher/subjects/my`, {subjects});
  }

  deleteTeachedSubject(subject_id){
    return this.http.delete(`${environment.apiUrl}/teacher/subjects/${subject_id}`);
  }
}
