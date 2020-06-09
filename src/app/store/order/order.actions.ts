import { Order } from 'src/app/components/home/home.component';


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
