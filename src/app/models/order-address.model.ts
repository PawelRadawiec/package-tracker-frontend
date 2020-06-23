export class OrderAddress {
    id: number;
    street: string;
    city: string;
    postalCode: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}
