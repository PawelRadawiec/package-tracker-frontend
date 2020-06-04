import { Component, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription } from 'rxjs';

export class Order {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'status'];
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
      })
    );
  }

}
