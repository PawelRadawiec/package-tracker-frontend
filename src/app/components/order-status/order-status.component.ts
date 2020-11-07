import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderState } from 'src/app/store/order/order.state';
import { MatDialog } from '@angular/material/dialog';
import { OrderHelper } from 'src/app/helper/order-helper';
import { Bullet } from 'src/app/models/bullet.model';

import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Store } from '@ngxs/store';
import { GetOrderHistoryRequest } from 'src/app/store/order/order.actions';
import { OrderHistoryDialogComponent } from '../order-history-dialog/order-history-dialog.component';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  private subscriptions: Subscription[] = [];
  bullets: Bullet[] = [];
  currentIndexStep: number;
  stompClient: any;
  order: Order;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private orderHelper: OrderHelper
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(OrderState.getOrder).subscribe(order => this.handleOrderSubscription(order)),
      this.store.select(OrderState.bullets).subscribe(bullets => this.handleBulletsSubscription(bullets))
    );
    this.setWebSocketConntection();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    this.setStepperSelectedIndex(this.order.status);
    this.cdr.detectChanges();
  }

  handleOrderSubscription(order: Order) {
    if (order) {
      this.order = order;
    }
  }

  handleBulletsSubscription(bullets: Bullet[]) {
    if (Array.isArray(bullets)) {
      this.bullets = bullets;
    }
  }

  setWebSocketConntection() {
    this.stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
    this.stompClient.connect({}, () => this.handleConnection());
  }

  handleConnection() {
    this.subscriptions.push(
      this.stompClient.subscribe(
        `/topic/message.${this.order.code}`,
        (order: { body: string; }) => this.updateBullet(JSON.parse(order.body))
      )
    );
  }

  updateBullet(messageResult: Order) {
    const bullet = this.bullets.find(b => b.code === messageResult.status);
    if (bullet) {
      bullet.done = true;
      this.bullets[this.bullets.indexOf(bullet)] = bullet;
      this.setStepperSelectedIndex(bullet.code);
    }
  }

  setStepperSelectedIndex(status: string) {
    const index = this.orderHelper.getStatusStepperIndex(status);
    this.currentIndexStep = index;
    if (index !== 0) {
      this.stepper.selectedIndex = index;
    }
  }

  openHistory() {
    this.store.dispatch(new GetOrderHistoryRequest(this.order.id, OrderHistoryDialogComponent));
  }

  nextStep() {
    this.stepper.next();
  }

}
