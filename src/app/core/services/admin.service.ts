import { HttpClient, HttpParams } from '@angular/common/http';
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

  searchStudents(filters){
    return this.http.post(`${environment.apiUrl}/admin/students/search`, filters);
  }

  showTeacher(id){
    return this.http.get(`${environment.apiUrl}/admin/teachers/${id}`);
  }

  showStudent(id){
    return this.http.get(`${environment.apiUrl}/admin/students/${id}`);
  }

  updateDiplomaStatus(diploma_id, status_code){
    return this.http.put(`${environment.apiUrl}/admin/teachers/diploma/${diploma_id}`, {status_code});
  }

  approveTeacher(teacher_id, validated){
    return this.http.put(`${environment.apiUrl}/admin/teachers/approve/${teacher_id}`, {validated});
  }

  public getAllStudentsLessons(filters, student_id){
    const params = new HttpParams({
      fromObject: filters
    });
    return this.http.get(`${environment.apiUrl}/admin/students/${student_id}/all-lessons`, {params});
  }
  
  getDisputes(){
    return this.http.get(`${environment.apiUrl}/admin/disputes`);
  }

  getDispute(dispute_id){
    return this.http.get(`${environment.apiUrl}/admin/disputes/${dispute_id}`);
  }

  getSubjects(){
    return this.http.get(`${environment.apiUrl}/admin/subjects`);
  }

  addSubject(subject){
    return this.http.post(`${environment.apiUrl}/admin/subject`, subject);
  }

  editSubject(id, subject){
    return this.http.patch(`${environment.apiUrl}/admin/subject/${id}`, subject);
  }

  closeDispute(dispute_id){
    return this.http.delete(`${environment.apiUrl}/admin/disputes/${dispute_id}`);
  }

  proceedRefund(user_id, lesson_id){
    return this.http.post(`${environment.apiUrl}/admin/disputes/refund/${user_id}/${lesson_id}`, {});
  }
}
