import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {

  constructor(private http : HttpClient) { }


  getMyDiplomas(){
    return this.http.get(`${environment.apiUrl}/teacher/diploma`)
  }

  deleteFile(diploma_id){
    return this.http.delete(`${environment.apiUrl}/teacher/diploma/${diploma_id}`);
  }
}
