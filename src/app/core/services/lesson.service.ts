import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http : HttpClient) { }

  public store(obj){
    return this.http.post(`${environment.apiUrl}/lessons`, {...obj});
  }

}
