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


  search(filters){
    return this.http.post(`${environment.apiUrl}/teacher/search`, filters);
  }

  get(teacher_id){
    return this.http.get(`${environment.apiUrl}/teacher/${teacher_id}`);
  }

  getMyProfile(){
    return this.http.get(`${environment.apiUrl}/teacher/profile/my`);
  }

  updateProfile(profile){
    return this.http.put(`${environment.apiUrl}/teacher/profile`, profile);
  }
}
