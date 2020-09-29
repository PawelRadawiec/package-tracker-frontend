import { LoginRequest } from 'src/app/models/login-request.model';
import { SystemUserAuthorizationInfo } from 'src/app/models/login-response.model';

export class SigninRequest {
    static readonly type = '[Authorization] LoginRequest';
    constructor(public request: LoginRequest) {

    }
}

export class SigninResponse {
    static readonly type = '[Authorization] LoginResponse';
    constructor(public response: SystemUserAuthorizationInfo) {

    }
}

export class LogoutRequest {
    static readonly type = '[Authorization] LogoutRequest';
    constructor(public request: SystemUserAuthorizationInfo) {

    }
}

export class LogoutResponse {
    static readonly type = '[Authorization] LogoutResponse';
    constructor() {

    }
}

export class AuthFaild {
    static readonly type = '[Authorization] AuthFaild';
    constructor(public reject: any) {

    }
}
