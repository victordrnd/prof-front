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

  findPlaces(keyword){
    return this.http.get(`${environment.chatServer}/maps/search?query=${keyword}`).pipe(map((res:any) => res.results));
    // return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?proximity=ip&types=address&access_token=${environment.mapboxAccessToken}`).pipe(map((res:any) => res.features))
  }


  attach(place){
    return this.http.post(`${environment.apiUrl}/places/attach`, place);
  }

  getMyAddress(){
    return this.http.get(`${environment.apiUrl}/address/my`, {context : withCache({key : 'my_address'})});
  }
}
