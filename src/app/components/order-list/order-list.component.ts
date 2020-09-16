import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(OrderState.orderList).subscribe(
      orders => this.orders = _.cloneDeep(orders)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
