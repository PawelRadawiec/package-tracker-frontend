import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { GetBullets } from '../store/order/order.actions';
import { map } from 'rxjs/operators';
import { OrderState } from '../store/order/order.state';

@Injectable()
export class BulletResolver implements Resolve<any> {

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Order> {
        return this.store.dispatch(new GetBullets()).pipe(
            map(() => this.store.selectSnapshot(OrderState))
        );
    }

}
