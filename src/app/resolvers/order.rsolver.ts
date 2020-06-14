import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetOrderByIdAndCode } from '../store/order/order.actions';
import { OrderState } from '../store/order/order.state';
import { Order } from '../models/order.model';

@Injectable()
export class OrderResolver implements Resolve<any> {

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Order> {
        const id = route.params.id;
        const code = route.params.code;
        return this.store.dispatch(new GetOrderByIdAndCode(id, code)).pipe(
            map(() => this.store.selectSnapshot(OrderState))
        );
    }

}
