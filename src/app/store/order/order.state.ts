import { Order } from 'src/app/components/home/home.component';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StartOrder, CreateOrder } from './order.actions';
import { OrderService } from 'src/app/service/order.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

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

    constructor(private orderService: OrderService) {

    }

    @Selector()
    static getOrder(state: OrderStateModel) {
        return state.order;
    }

    @Action(CreateOrder)
    startOrder(state: StateContext<OrderStateModel>, action: CreateOrder) {
        return this.orderService.create(action.payload).pipe(
            tap(response => {
                state.patchState({
                    order: response
                });
            })
        );
    }

}
