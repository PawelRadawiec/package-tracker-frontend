import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { Order } from 'src/app/models/order.model';
import { OrderState } from 'src/app/store/order/order.state';

import * as Stomp from 'stompjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryDialogComponent } from '../order-history-dialog/order-history-dialog.component';
import { OrderHelper } from 'src/app/helper/order-helper';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Select(OrderState.getOrder) order$: Observable<Order>;
  private subscriptions: Subscription[] = [];
  stompClient: any;
  currentIndexStep: number;
  order: Order;
  orders: Order[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private orderHelper: OrderHelper
  ) { }

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
    this.stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
    const that = this;
    this.stompClient.connect({}, () => that.handleConnection());
  }

  handleConnection() {
    this.subscriptions.push(
      this.stompClient.subscribe(`/topic/package`, (order) => {
        const messageResult = JSON.parse(order.body);
        this.orders.push(messageResult);
        this.orders = [...this.orders];
        this.orders = this.orders.sort((a, b) => a.id - b.id);
        if (Array.isArray(this.orders) && this.orders.length > 0) {
          const lastOrder = this.orders[this.orders.length - 1];
          this.setStepperSelectedIndex(lastOrder.status);
        }
      })
    );
  }

  nextStep() {
    this.stepper.next();
  }

  setStepperSelectedIndex(status: string) {
    const index = this.orderHelper.getStatusStepperIndex(status);
    this.currentIndexStep = index;
    if (index !== 0) {
      this.stepper.selectedIndex = index;
    }
  }

  openHistory() {
    this.dialog.open(OrderHistoryDialogComponent);
  }

}
