import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Select } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Select(OrderState.getOrder) order$: Observable<Order>;
  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'statusColor'];
  stompClient: any;

  order: Order;
  orders: Order[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(this.order$.subscribe(order => {
      if (order) {
        this.order = order;
      }
    }));
    this.setWebSocketConntection();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  ngAfterViewInit() {
    this.setStepperSelectedIndex(this.order.status);
    this.cdr.detectChanges();
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
        this.nextStep();
      })
    );
  }

  sortOrders() {
    this.orders = this.orders.sort((a, b) => a.id - b.id);
  }

  nextStep() {
    this.stepper.next();
  }

  setStepperSelectedIndex(status: string) {
    let index: number;
    switch (status) {
      case 'WAREHOUSE':
        index = 1;
        break;
      case 'SORTING_PLANT':
        index = 2;
        break;
      case 'TRANSPORT':
        index = 3;
        break;
      case 'PARCEL_LOCKER':
        index = 4;
        break;
      default:
        index = 0;
    }
    if (index !== 0) {
      this.stepper.selectedIndex = index;
    }
  }


}
