import { Product } from './product.model';
import { SystemUser } from './system-user.model';

export class Basket {
    id: number;
    owner: SystemUser;
    products: Product[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
    
}