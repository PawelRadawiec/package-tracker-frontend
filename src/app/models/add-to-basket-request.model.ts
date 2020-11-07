import { Basket } from './basket.model';
import { Product } from './product.model';

export class AddToBasketRequest {
    basket: Basket;
    product: Product;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}