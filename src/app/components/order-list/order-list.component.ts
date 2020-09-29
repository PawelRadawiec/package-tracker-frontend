import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';
import { Page } from 'src/app/models/page/page.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  page: Page;
  orders: Order[] = [];
  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(OrderState.page).subscribe(page => this.handlePageSubscribe(page));
  }

  handlePageSubscribe(page: Page) {
    this.page = _.cloneDeep(page);
    if (!this.page) {
      this.page = new Page();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
