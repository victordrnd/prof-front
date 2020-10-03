import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http : HttpClient) { }

  attachProfile(profile){
    return this.http.post(`${environment.apiUrl}/teacher/profile/create`, profile);
  }
  uploadAvatar(avatar){
    return this.http.post(`${environment.apiUrl}/teacher/profile/avatar`, avatar);
  }


  search(subject_id){
    return this.http.post(`${environment.apiUrl}/teacher/search`, {subject_id});
  }

  get(teacher_id){
    return this.http.get(`${environment.apiUrl}/teacher/${teacher_id}`);
  }
}
