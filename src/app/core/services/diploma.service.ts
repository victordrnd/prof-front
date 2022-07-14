import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCacheManager, withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {

  constructor(private http : HttpClient,
    private cache : HttpCacheManager) { }


  getMyDiplomas(){
    return this.http.get(`${environment.apiUrl}/teacher/diploma`, {context : withCache({key : "diploma"})})
  }

  deleteFile(diploma_id){
    this.cache.delete('diploma');
    return this.http.delete(`${environment.apiUrl}/teacher/diploma/${diploma_id}`);
  }
}
