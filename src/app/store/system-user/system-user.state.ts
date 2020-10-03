
import { State, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SystemUser } from 'src/app/models/system-user.model';
import { SystemUserService } from 'src/app/service/system-user.service';
import { RegistrationRequest, RegistrationResponse, SystemUserFail } from './syste-user.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface SystemUserStateModel {
    user: SystemUser;
}

@State<SystemUserStateModel>({
    name: 'systemUser',
    defaults: {
        user: null
    }
})

@Injectable()
export class SystemUserState {
    constructor(
        private store: Store,
        private systemUserService: SystemUserService
    ) {
    }


    @Action(RegistrationRequest)
    registrationRequest(context: StateContext<SystemUserStateModel>, action: RegistrationRequest) {
        return this.systemUserService.registration(action.request).pipe(
            mergeMap(respone => this.store.dispatch(new RegistrationResponse(respone))),
            catchError(reject => of(new SystemUserFail()))
        );
    }

    @Action(RegistrationResponse)
    registrationResponse(context: StateContext<SystemUserStateModel>, action: RegistrationResponse) {
        context.patchState({
            user: action.response
        });
    }

}
