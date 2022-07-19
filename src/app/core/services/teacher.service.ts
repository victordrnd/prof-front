import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  attachProfile(profile) {
    return this.http.post(`${environment.apiUrl}/teacher/profile/create`, profile);
  }


  search(filters) {
    return this.http.post(`${environment.apiUrl}/teacher/search`, filters);
  }

  get(teacher_id) {
    return this.http.get(`${environment.apiUrl}/teacher/${teacher_id}`);
  }

  getMyProfile() {
    return this.http.get(`${environment.apiUrl}/teacher/profile/my`, { context: withCache() });
  }

  updateProfile(profile) {
    return this.http.put(`${environment.apiUrl}/teacher/profile`, profile);
  }

  getStripeAccount() {
    return this.http.get(`${environment.apiUrl}/teacher/stripe`, { context: withCache() });
  }


  getStripeAccountLink() {
    return this.http.get(`${environment.apiUrl}/teacher/stripe/account_link`);
  }

  createBankAccount(iban) {
    return this.http.post(`${environment.apiUrl}/teacher/stripe/iban`, { iban });
  }

  acceptStudentLesson(student_id, lesson_id) {
    return this.http.put(`${environment.apiUrl}/teacher/lesson/confirm/student`, { student_id, lesson_id });
  };

  getTransfers() {
    return this.http.get(`${environment.apiUrl}/teacher/stripe/transfers`, { context: withCache() }).pipe(map((res: any) => res.data));
  }
}
