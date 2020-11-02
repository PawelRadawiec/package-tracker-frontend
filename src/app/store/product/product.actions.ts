import { Page } from 'src/app/models/page/page.model';

export class GetProductRequest {
    static readonly type = '[Product] GetProductRequest';

    constructor() {

    }

}

export class GetProductResponse {
    static readonly type = '[Product] GetProductResponse'

    constructor(public page: Page) {

    }

}

export class ProductRequestFailure {
    static readonly type = '[Product] ProductRequestFailure';

    constructor(public errors: Map<string, string>) {

    }
}