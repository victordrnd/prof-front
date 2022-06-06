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


  search(filters){
    return this.http.post(`${environment.apiUrl}/teacher/search`, filters);
  }

  get(teacher_id){
    return this.http.get(`${environment.apiUrl}/teacher/${teacher_id}`);
  }
}
