import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }

  findPlaces(keyword){
    return this.http.post(`${environment.apiUrl}/places/find`, {keyword})
  }
  attach(place){
    return this.http.post(`${environment.apiUrl}/places/attach`, place);
  }
}
