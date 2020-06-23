import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:8080/order';

  constructor(private http: HttpClient) { }

  create(payload: Order) {
    return this.http.post<Order>(`${this.baseUrl}/create`, payload);
  }

  start(payload: Order) {
    return this.http.post<Order>(`${this.baseUrl}/start`, payload);
  }

  getByIdAndCode(id: number, code: string) {
    return this.http.get<Order>(`${this.baseUrl}/${id}/${code}`);
  }

}
