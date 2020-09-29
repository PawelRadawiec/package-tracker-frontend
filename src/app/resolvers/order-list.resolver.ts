import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs'; import { Order } from '../models/order.model';
import { OrderService } from '../service/order.service';
import { SearchOrderListRequest } from '../store/order/order.actions';
import { OrderState } from '../store/order/order.state';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderListResolver implements Resolve<any> {

    constructor(
        private store: Store,
        private service: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
        return this.store.dispatch(new SearchOrderListRequest()).pipe(
            map(() => this.store.selectSnapshot(OrderState))
        );
    }

}
