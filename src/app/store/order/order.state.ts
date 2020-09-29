import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { OrderService } from 'src/app/service/order.service';
import { Order, OrderHistory } from 'src/app/models/order.model';
import { Bullet } from 'src/app/models/bullet.model';
import {
    CreateOrder, StartOrder, OrderRequestFailure,
    GetOrderByIdAndCode, GetBullets, GetOrderHistoryRequest,
    GetOrderHistoryResponse,
    SearchOrderListRequest,
    SearchOrderListResponse
} from './order.actions';
import { ModalHelperService, DialogCode } from 'src/app/service/modal-helper.service';
import { Page } from 'src/app/models/page/page.model';

export interface OrderStateModel {
    order: Order;
    startLoading: boolean;
    bullets: Bullet[];
    orderHistory: OrderHistory[];
    page: Page;
    errors: Map<string, string>;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        order: null,
        startLoading: false,
        bullets: [],
        orderHistory: [],
        page: null,
        errors: new Map()
    }
})

@Injectable()
export class OrderState {

    constructor(
        private router: Router,
        private store: Store,
        private orderService: OrderService,
        private dialogHelper: ModalHelperService
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

    @Selector()
    static orderHistory(state: OrderStateModel) {
        return state.orderHistory;
    }

    @Selector()
    static page(state: OrderStateModel) {
        return state.page;
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

    @Action(GetOrderHistoryRequest)
    getOrderHistoryRequest(state: StateContext<OrderStateModel>, action: GetOrderHistoryRequest) {
        return this.orderService.getOrderHistory(action.orderId).pipe(
            mergeMap(response => this.store.dispatch(new GetOrderHistoryResponse(response))),
            catchError(error => this.store.dispatch(new OrderRequestFailure(error.error)))
        );
    }

    @Action(GetOrderHistoryResponse)
    getOrderHistoryResponse(state: StateContext<OrderStateModel>, action: GetOrderHistoryResponse) {
        const response = action.orderHistory;
        state.patchState({
            orderHistory: response
        });
        this.dialogHelper.openDialogByCode(DialogCode.ORDER_HISTORY, response);
    }

    @Action(SearchOrderListRequest)
    searchOrderRequest(state: StateContext<OrderStateModel>, action: SearchOrderListRequest) {
        return this.orderService.search(action.request).pipe(
            mergeMap(response => this.store.dispatch(new SearchOrderListResponse(response))),
            catchError(error => this.store.dispatch(new OrderRequestFailure(error.error)))
        );
    }

    @Action(SearchOrderListResponse)
    searchOrderResponse(state: StateContext<OrderStateModel>, action: SearchOrderListResponse) {
        state.patchState({
            page: action.response
        });
    }

    @Action(OrderRequestFailure)
    requestFailure(state: StateContext<OrderStateModel>, action: OrderRequestFailure) {
        state.patchState({
            startLoading: false,
            errors: action.errors
        });
    }

}
