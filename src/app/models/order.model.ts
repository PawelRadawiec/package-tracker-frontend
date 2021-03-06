import { OrderPerson } from './order-person.model';
import { OrderAddress } from './order-address.model';
import { Product } from './product.model';

export class Order {
    id: number;
    code: string;
    status: string;
    statusColor: string;
    orderStartDate: string;
    orderEndDate: string;
    orderType: string;
    transportType: string;
    person: OrderPerson;
    address: OrderAddress;
    product: Product;
    orderHistoryList: OrderHistory[];

    constructor(props = {}) {
        Object.assign(this, props);
    }

}

export class OrderHistory {
    id: number;
    code: string;
    status: string;
    statusColor: string;
    createdAt: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
