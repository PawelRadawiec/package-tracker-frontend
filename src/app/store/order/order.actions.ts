import { Order, OrderHistory } from 'src/app/models/order.model';


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

    constructor(public orderId: number) {

    }
}

export class GetOrderHistoryResponse {
    static readonly type = '[Order] GetOrderHistoryResponse';

    constructor(public orderHistory: OrderHistory[]) {

    }
}



