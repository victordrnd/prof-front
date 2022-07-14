import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http : HttpClient) { }


  getLessonStatus(){
    return this.http.get(`${environment.apiUrl}/status/lesson`, {context : withCache()});
  }
}
