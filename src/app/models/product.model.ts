import { Basket } from './basket.model';
import { Order } from './order.model';
import { SystemUser } from './system-user.model';

export class Product {
    id: number;
    name: string;
    description: string;
    code: string;
    owner: SystemUser;
    basket: Basket;
    order: Order;

    constructor(props = {}) {
        Object.assign(this, props);
    }
    
}