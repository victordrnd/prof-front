import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {

  constructor(private http : HttpClient) { }


  create(dispute){
    return this.http.post(`${environment.apiUrl}/disputes`, dispute);
  }
}
