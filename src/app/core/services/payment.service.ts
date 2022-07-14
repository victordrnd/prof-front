import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpCacheManager, withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient,
    private cache : HttpCacheManager) { }

  getAllPaymentMethods(){
    return this.http.get(`${environment.apiUrl}/payments`, {context : withCache({key : 'pm_list'})})
  }

  createPaymentMethod(values){
    this.cache.delete('pm_list');
    return this.http.post(`${environment.apiUrl}/payments`, values);
  }

  getActionsRequired(){
    return this.http.get(`${environment.apiUrl}/payments/actions`);
  }

  setDefaultPm(obj){
    return this.http.post(`${environment.apiUrl}/payments/default`, obj);
  }
  detachPaymentMethod(obj){
    return this.http.post(`${environment.apiUrl}/payments/detach`, obj);
  }

  generateIntent(){
    return this.http.get(`${environment.apiUrl}/payments/generate_intent`);
  }


  hasPaymentMethods(){
    return this.http.get(`${environment.apiUrl}/payments/can`, {context : withCache()});
  }


  getReceipt(charge_id){
    return this.http.get(`${environment.apiUrl}/payments/receipt/${charge_id}`)
  }

  getIntent(pi_id){
    return this.http.get(`${environment.apiUrl}/payments/intent/${pi_id}`);
  }

  confirmIntent(user_lesson_id){
    return this.http.get(`${environment.apiUrl}/payments/intent/confirm/${user_lesson_id}`);
  }

  getMyCharges(){
    return this.http.get(`${environment.apiUrl}/payments/charges`, {context : withCache()}).pipe(map((res:any) => res.data));
  }
}
