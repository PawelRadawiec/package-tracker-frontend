import { Order } from 'src/app/models/order.model';


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

export class OrderRequestFailure {
    static readonly type = '[Order] OrderRequestFailure';

    constructor(public errors: { [key: string]: string; }) {

    }
}

