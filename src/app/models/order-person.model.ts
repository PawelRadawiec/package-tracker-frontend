export class OrderPerson {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
