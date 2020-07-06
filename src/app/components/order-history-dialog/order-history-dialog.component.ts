import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';
import { Order } from 'src/app/models/order.model';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history-dialog',
  templateUrl: './order-history-dialog.component.html',
  styleUrls: ['./order-history-dialog.component.scss']
})
export class OrderHistoryDialogComponent implements OnInit, OnDestroy {

  @Select(OrderState.getOrder) order$: Observable<Order>;
  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'date'];
  order: Order;
  subscribe: Subscription;

  constructor() {
    this.subscribe = this.order$.subscribe(order => this.order = order);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
