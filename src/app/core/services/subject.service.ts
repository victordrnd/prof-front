import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get(`${environment.apiUrl}/subject/all`);
  }
}
