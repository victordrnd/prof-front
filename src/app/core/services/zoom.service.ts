import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ZoomVideo from '@zoom/videosdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private http : HttpClient) { }

  public client;

  createClient(){
   this.client = ZoomVideo.createClient();
   return this.client;
  }
  generateSignature(lesson_id){
    return this.http.get(`${environment.apiUrl}/zoom/${lesson_id}/jwt`);
  }
}
