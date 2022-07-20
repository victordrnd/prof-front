import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debounce, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }

  async findPlaces(keyword){
    const token : any = await this.getToken().toPromise();
    return this.http.get(`https://api.apple-mapkit.com/v1/searchAutocomplete?q=${keyword}`, {headers : {"Authorization" : "Bearer " +token.accessToken}}).pipe(map((res:any) => res.results)).toPromise();
  }

  async getPlaceDetails(completionUrl){
    const token : any = await this.getToken().toPromise();
    return this.http.get(`https://api.apple-mapkit.com${completionUrl}`, {headers : {"Authorization" : "Bearer " +token.accessToken}}).pipe(map((res:any) => res.results[0])).toPromise();
  }
  getToken(){
    return this.http.get(`${environment.chatServer}/maps/token`, {context : withCache({ttl : 60*1000})})
  }

  attach(place){
    return this.http.post(`${environment.apiUrl}/places/attach`, place);
  }

  getMyAddress(){
    return this.http.get(`${environment.apiUrl}/address/my`, {context : withCache({key : 'my_address'})});
  }
}
