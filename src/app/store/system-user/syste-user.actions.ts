import { SystemUser } from 'src/app/models/system-user.model';

export class RegistrationRequest {
    static readonly type = '[SystemUser] RegistrationRequest';

    constructor(public request: SystemUser) {

    }
}

export class RegistrationResponse {
    static readonly type = '[SystemUser] RegistrationResponse';

    constructor(public response: SystemUser) {

    }
}

export class SystemUserFail {
    static readonly type = '[SystemUser] SystemUserFail';

    constructor(public errors?: any) {

    }
}

