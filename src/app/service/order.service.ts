import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderHistory } from '../models/order.model';
import { Bullet } from '../models/bullet.model';
import { Page } from '../models/page/page.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/order';
  private bulletUrl = 'http://localhost:8080/bullet';

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

  getBullets() {
    return this.http.get<Bullet[]>(`${this.bulletUrl}/list`);
  }

  getOrderHistory(orderId: number) {
    return this.http.get<OrderHistory[]>(`${this.baseUrl}/${orderId}/history`);
  }

  search() {
    return this.http.get<Page>(`${this.baseUrl}/search`);
  }

}
