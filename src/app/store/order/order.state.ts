import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/components/home/home.component';
import { StartOrder, CreateOrder } from './order.actions';
import { OrderService } from 'src/app/service/order.service';


export interface OrderStateModel {
    order: Order;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        order: null
    }
})

@Injectable()
export class OrderState {

    constructor(
        private orderService: OrderService,
        private router: Router,
        private store: Store
    ) {

    }

    @Selector()
    static getOrder(state: OrderStateModel) {
        return state.order;
    }

    @Action(CreateOrder)
    createOrder(state: StateContext<OrderStateModel>, action: CreateOrder) {
        return this.orderService.create(action.payload).pipe(
            tap(response => {
                state.patchState({
                    order: response
                });
                this.router.navigate([`status/${response.code}`]);
                this.store.dispatch(new StartOrder(response));
            })
        );
    }

    @Action(StartOrder)
    startOrder(state: StateContext<OrderStateModel>, action: StartOrder) {
        return this.orderService.start(action.payload).pipe(
            tap((response) => {
                state.patchState({
                    order: response
                });
            })
        );
    }

}
