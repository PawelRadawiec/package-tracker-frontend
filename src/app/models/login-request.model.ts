export class LoginRequest {
    username: string;
    password: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}