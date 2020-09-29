export class SystemUserAuthorizationInfo {
    id: number;
    username: string;
    email: string;
    token: string;
    roles: string[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}