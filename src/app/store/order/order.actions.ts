import { Order, OrderHistory } from 'src/app/models/order.model';
import { Page } from 'src/app/models/page/page.model';
import { OrderListRequest } from 'src/app/models/order-list-request.model';


export class StartOrder {
    static readonly type = '[Order] StartOrder';

    constructor(public payload: Order) {

    }

}

export class CreateOrder {
    static readonly type = '[Order] CreateOrder';

    constructor(public payload: Order) {

    }

}

export class GetOrderByIdAndCode {
    static readonly type = '[Order] GetOrderByIdAndCode';

    constructor(public id: number, public code: string) {

    }
}

export class GetBullets {
    static readonly type = '[Order] GetBullets';
}

export class OrderRequestFailure {
    static readonly type = '[Order] OrderRequestFailure';

    constructor(public errors: Map<string, string>) {

    }
}

export class GetOrderHistoryRequest {
    static readonly type = '[Order] GetOrderHistoryRequest';

    constructor(public orderId: number, public component: any) {

    }
}

export class GetOrderHistoryResponse {
    static readonly type = '[Order] GetOrderHistoryResponse';

    constructor(public orderHistory: OrderHistory[], public component: any) {

    }
}

export class SearchOrderListRequest {
    static readonly type = '[Order] SearchOrderListRequest';

    constructor(public request?: OrderListRequest) {

    }
}

export class SearchOrderListResponse {
    static readonly type = '[Order] SearchOrderListResponse';

    constructor(public response: Page) {

    }
}

export class SearchOrderListDebounce {
    static readonly type = '[Order] SearchOrderListDebounce';

    constructor(public request: OrderListRequest) {

    }
}



