import { Order } from 'src/app/components/home/home.component';


export class StartOrder {
    static readonly type = '[Order] StartOrder';

    constructor(public payload: Order) {

    }

}
