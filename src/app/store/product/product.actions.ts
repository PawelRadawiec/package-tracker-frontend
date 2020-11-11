import { Page } from 'src/app/models/page/page.model';
import { Product } from 'src/app/models/product.model';


export class GetProductRequest {
    static readonly type = '[Product] GetProductRequest';

    constructor(public pageable: any) { }

}

export class GetOwnerProductsRequest {
    static readonly type = '[Product] GetOwnerProductsRequest';
    constructor(public pageable: any) { }
}

export class SetProducts {
    static readonly type = '[Product] SetProducts';

    constructor(public page: Page) { }

}

export class CreateProductRequest {
    static readonly type = '[Product] CreateProductRequest'

    constructor(public request: Product) { }
}

export class CreateProductResponse {
    static readonly type = '[Product] CreateProductResponse'

    constructor(public response: Product) { }
}

export class BuyProduct {
    static readonly type = '[Product] BuyProduct';

    constructor(public product: Product) { }

}

export class ProductRequestFailure {
    static readonly type = '[Product] ProductRequestFailure';

    constructor(public errors: Map<string, string>) { }

}
