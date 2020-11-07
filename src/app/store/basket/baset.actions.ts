import { AddToBasketRequest } from 'src/app/models/add-to-basket-request.model';
import { Basket } from 'src/app/models/basket.model';
import { Product } from 'src/app/models/product.model';


export class GetBasketCountRequest {
    static readonly type = '[Basket] GetBasketCountRequest';
    constructor() {

    }
}

export class SetBasketCount {
    static readonly type = '[Basket] SetBasketCount';
    constructor(public count: number) {

    }
}

export class GetBasketByOwnerRequest {
    static readonly type = '[Basket] GetBasketByOwnerRequest';
    constructor(public openModal: boolean, public compoent?: any) {

    }
}

export class SetBasket {
    static readonly type = '[Basket] SetBasket';
    constructor(
        public basket: Basket,
        public openModal: boolean,
        public component?: any
    ) {
    }
}

export class AddProductToBasketRequest {
    static readonly type = '[Basket] AddProductToBasketRequest';

    constructor(public request: AddToBasketRequest) {
    }
}

export class DeleteProductFromBasket {
    static readonly type = '[Basket] DeleteProductFromBasket';

    constructor(
        public basketId: number,
        public product: Product
    ) {
    }

}