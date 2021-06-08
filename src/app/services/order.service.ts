import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/entities/order';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "https://localhost:44337/api/orders";

  constructor(private httpClient:HttpClient) { }

  getOrder(orderId:number):Observable<ListResponseModel<Order>>{
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl + "/getbyid?orderId=" + orderId)
  }

  getOrders():Observable<ListResponseModel<Order>>{
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl + "/getall" )
  }

  addOrder(order:Order):Observable<Order>{
    return this.httpClient.post<Order>(this.apiUrl+"/add", order)
  }
}
