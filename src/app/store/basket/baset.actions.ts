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