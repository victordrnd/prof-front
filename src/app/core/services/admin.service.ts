import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  searchTeachers(filters){
    return this.http.post(`${environment.apiUrl}/admin/teachers/search`, filters);
  }

  showTeacher(id){
    return this.http.get(`${environment.apiUrl}/admin/teachers/${id}`);
  }

  updateDiplomaStatus(diploma_id, status_code){
    return this.http.put(`${environment.apiUrl}/admin/teachers/diploma/${diploma_id}`, {status_code});
  }

  approveTeacher(teacher_id, validated){
    return this.http.put(`${environment.apiUrl}/admin/teachers/approve/${teacher_id}`, {validated});
  }


  getDisputes(){
    return this.http.get(`${environment.apiUrl}/admin/disputes`);
  }

  getDispute(dispute_id){
    return this.http.get(`${environment.apiUrl}/admin/disputes/${dispute_id}`);
  }

  closeDispute(dispute_id){
    return this.http.delete(`${environment.apiUrl}/admin/disputes/${dispute_id}`);
  }

  proceedRefund(user_id, lesson_id){
    return this.http.post(`${environment.apiUrl}/admin/disputes/refund/${user_id}/${lesson_id}`, {});
  }
}
