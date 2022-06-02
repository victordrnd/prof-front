import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  setAvatar(avatar){
    return this.http.post(`${environment.apiUrl}/users/avatar`, avatar);
  }


  updateUser(user){
    return this.http.put(`${environment.apiUrl}/users`, user)
  }
}
