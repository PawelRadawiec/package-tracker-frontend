export class SystemUser {
    id: number;
    username: string;
    email: string;
    password: string;
    logged: boolean;
    roles: Role[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}

export class Role {
    id: number;
    name: UserRole;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}

export enum UserRole {
    ROLE_USER = 'ROLE_USER',
    ROLE_MODERATOR = 'ROLE_MODERATOR',
    ROLE_ADMIN = 'ROLE_ADMIN'
}
