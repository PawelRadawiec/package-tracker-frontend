import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderState } from 'src/app/store/order/order.state';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryDialogComponent } from '../order-history-dialog/order-history-dialog.component';
import { OrderHelper } from 'src/app/helper/order-helper';
import { Bullet } from 'src/app/models/bullet.model';

import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Select(OrderState.getOrder) order$: Observable<Order>;
  @Select(OrderState.bullets) bullets$: Observable<Bullet[]>;

  private subscriptions: Subscription[] = [];
  stompClient: any;
  currentIndexStep: number;
  order: Order;
  bullets: Bullet[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private orderHelper: OrderHelper
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.order$.subscribe(order => this.handleOrderSubscription(order)),
      this.bullets$.subscribe(bullets => this.handleBulletsSubscription(bullets))
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
        `/topic/package`,
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
    this.dialog.open(OrderHistoryDialogComponent);
  }

  nextStep() {
    this.stepper.next();
  }

}
