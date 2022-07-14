import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCacheManager } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private cache : HttpCacheManager) { }


  setAvatar(avatar){
    return this.http.post(`${environment.apiUrl}/users/avatar`, avatar);
  }


  updateUser(user){
    this.cache.delete('my_address');
    return this.http.put(`${environment.apiUrl}/users`, user)
  }

  getStats(){
    return this.http.get(`${environment.apiUrl}/admin/stats`)
  }
}
