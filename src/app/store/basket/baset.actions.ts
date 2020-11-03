import { Basket } from 'src/app/models/basket.model';


export class GetBasketCountRequest {
    static readonly type  = '[Basket] GetBasketCountRequest';
    constructor() {

    }
}

export class SetBasketCount {
    static readonly type  = '[Basket] SetBasketCount';
    constructor(public count: number) {
        
    }
}

export class GetBasketByOwnerRequest {
    static readonly type = '[Basket] GetBasketByOwnerRequest';
    constructor() {

    }
}

export class SetBasket {
    static readonly type = '[Basket] SetBasket';
    constructor(public basket: Basket) {
        
    }
}