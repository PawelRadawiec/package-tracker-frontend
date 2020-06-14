import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StartOrder, CreateOrder, GetOrderByIdAndCode } from './order.actions';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/models/order.model';


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
                this.router.navigate([`status/${response.id}/${response.code}`]);
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

    @Action(GetOrderByIdAndCode)
    getOrderByIdAndCode(state: StateContext<OrderStateModel>, action: GetOrderByIdAndCode) {
        return this.orderService.getByIdAndCode(action.id, action.code).pipe(
            tap(response => {
                state.patchState({
                    order: response
                });
            })
        );
    }

}
