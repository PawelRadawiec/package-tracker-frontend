import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { GetBasketByOwnerRequest } from '../store/basket/baset.actions';
import { BasketState } from '../store/basket/basket.state';


@Injectable()
export class BasketCountResolver implements Resolve<any> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Order> {
        return this.store.dispatch(new GetBasketByOwnerRequest(false)).pipe(
            map(() => this.store.selectSnapshot(BasketState))
        );
    }

}