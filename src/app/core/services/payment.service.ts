import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  getAllPaymentMethods(){
    return this.http.get(`${environment.apiUrl}/payments`)
  }

  createPaymentMethod(values){
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
    return this.http.get(`${environment.apiUrl}/payments/can`);
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
    return this.http.get(`${environment.apiUrl}/payments/charges`).pipe(map((res:any) => res.data));
  }
}
