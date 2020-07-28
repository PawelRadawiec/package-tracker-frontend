import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { StartOrder, CreateOrder, GetOrderByIdAndCode, OrderRequestFailure, GetBullets } from './order.actions';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/models/order.model';
import { Bullet } from 'src/app/models/bullet.model';


export interface OrderStateModel {
    order: Order;
    startLoading: boolean;
    bullets: Bullet[];
    errors: Map<string, string>;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        order: null,
        startLoading: false,
        bullets: [],
        errors: new Map()
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

    @Selector()
    static startLoading(state: OrderStateModel) {
        return state.startLoading;
    }

    @Selector()
    static orderErrorMap(state: OrderStateModel) {
        return state.errors;
    }

    @Selector()
    static bullets(state: OrderStateModel) {
        return state.bullets;
    }

    @Action(CreateOrder)
    createOrder(state: StateContext<OrderStateModel>, action: CreateOrder) {
        state.patchState({
            startLoading: true
        });
        return this.orderService.create(action.payload).pipe(
            tap(response => {
                state.patchState({
                    order: response,
                    startLoading: false
                });
                this.router.navigate([`status/${response.id}/${response.code}`]);
                this.store.dispatch(new StartOrder(response));
            }),
            catchError(error => {
                console.log('Error occur: ', error);
                return this.store.dispatch(new OrderRequestFailure(error.error));
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

    @Action(GetBullets)
    getBulletsList(state: StateContext<OrderStateModel>) {
        return this.orderService.getBullets().pipe(
            tap(response => {
                state.patchState({
                    bullets: response
                });
            })
        );
    }

    @Action(OrderRequestFailure)
    requestFailure(state: StateContext<OrderStateModel>, action: OrderRequestFailure) {
        state.patchState({
            startLoading: false,
            errors: action.errors
        });
    }

}
