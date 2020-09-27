import { LoginRequest } from 'src/app/models/login-request.model';
import { LoginResponse } from 'src/app/models/login-response.model';

export class SigninRequest {
    static readonly type = '[Authorization] LoginRequest';
    constructor(public request: LoginRequest) {

    }
}

export class SigninResponse {
    static readonly type = '[Authorization] LoginResponse';
    constructor(public response: LoginResponse) {

    }
}

export class AuthFaild {
    static readonly type = '[Authorization] AuthFaild';
    constructor(public reject: any) {

    }
}
