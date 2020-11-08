

export class ProductSearchRequest {
    name: string;
    category: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}

export class CustomPageable {
    page: number;
    size: number;
    name: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}