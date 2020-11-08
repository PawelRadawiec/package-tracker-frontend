import { Page } from 'src/app/models/page/page.model';


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

export class ProductRequestFailure {
    static readonly type = '[Product] ProductRequestFailure';

    constructor(public errors: Map<string, string>) { }

}
