import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { OrderState } from 'src/app/store/order/order.state';
import { Page } from 'src/app/models/page/page.model';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page: Page;
  orders: Observable<Order[]>;
  subscription: Subscription;
  dataSource: MatTableDataSource<Order>;


  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.store.select(OrderState.page).subscribe(page => this.handlePageSubscribe(page));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRef.detectChanges();
  }

  handlePageSubscribe(page: Page) {
    this.page = _.cloneDeep(page);
    if (!this.page) {
      this.page = new Page();
    }
    this.dataSource = new MatTableDataSource<Order>(this.page.content);
    this.orders = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}


