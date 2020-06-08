import { Order } from 'src/app/components/home/home.component';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StartOrder } from './order.actions';

export interface OrderStateModel {
    order: Order;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        order: null
    }
})
export class OrderState {

    @Selector()
    static getOrder(state: OrderStateModel) {
        return state.order;
    }

    @Action(StartOrder)
    startOrder(state: StateContext<OrderStateModel>, action: StartOrder) {
        state.patchState({
            order: action.payload
        });
    }

}
