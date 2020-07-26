import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }

  findPlaces(keyword){
    return this.http.post(`${environment.apiUrl}/places/find`, {keyword})
  }
}
