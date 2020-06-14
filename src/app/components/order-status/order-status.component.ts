import { Component, OnInit, OnDestroy } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Select } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  @Select(OrderState.getOrder) order$: Observable<Order>;

  order: Order;
  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'statusColor'];
  private subscriptions: Subscription[] = [];
  orders: Order[] = [];
  stompClient: any;

  constructor() { }

  ngOnInit() {
    this.subscriptions.push(this.order$.subscribe(order => this.order = order));
    this.setWebSocketConntection();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  setWebSocketConntection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.subscribeOrder();
    });
  }

  subscribeOrder() {
    const topic = `/topic/package`;
    this.subscriptions.push(
      this.stompClient.subscribe(topic, (order) => {
        const messageResult = JSON.parse(order.body);
        this.orders.push(messageResult);
        this.orders = [...this.orders];
        this.sortOrders();
      })
    );
  }

  sortOrders() {
    this.orders = this.orders.sort((a, b) => a.id - b.id);
  }

}
