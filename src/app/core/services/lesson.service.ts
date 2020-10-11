import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http : HttpClient) { }

  public getMyLessons(){
    return this.http.get(`${environment.apiUrl}/lessons`);
  }

  
  public store(obj){
    return this.http.post(`${environment.apiUrl}/lessons`, {...obj});
  }

}
