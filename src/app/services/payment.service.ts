import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/entities/order';
import { Payment } from '../models/entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44337/api/payments";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<Payment>{
    return this.httpClient.post<Payment>(this.apiUrl+"/add",payment)
  }

}
