import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http : HttpClient) { }


  create(review){
    return this.http.post(`${environment.apiUrl}/reviews`, review);
  }

  can(teacher_id){
    return this.http.post(`${environment.apiUrl}/reviews/can`, {teacher_id})
  }
}
