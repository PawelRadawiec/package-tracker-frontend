import { Component, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription } from 'rxjs';
import { Order } from '../home/home.component';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'statusColor'];
  private subscriptions: Subscription[] = [];
  orders: Order[] = [];
  stompClient: any;

  constructor() { }

  ngOnInit() {
    this.setWebSocketConntection();
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
