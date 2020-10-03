import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, OrderHistory } from '../models/order.model';
import { Bullet } from '../models/bullet.model';
import { Page } from '../models/page/page.model';
import { OrderListRequest } from '../models/order-list-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl + 'order';
  private bulletUrl = environment.baseUrl + 'bullet';

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

  search(request: OrderListRequest) {

    return this.http.get<Page>(`${this.baseUrl}/search`, { params: this.getParams(request) });
  }

  private getParams(request: OrderListRequest) {
    let params = new HttpParams();
    if (request) {
      params = params.append('name', request.name);
    }
    return params;
  }

}
