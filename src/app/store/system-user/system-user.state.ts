
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SystemUser } from 'src/app/models/system-user.model';
import { SystemUserService } from 'src/app/service/system-user.service';
import { RegistrationRequest, RegistrationResponse, SystemUserFail } from './syste-user.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface SystemUserStateModel {
    user: SystemUser;
    registerLoading: boolean;
}

@State<SystemUserStateModel>({
    name: 'systemUser',
    defaults: {
        user: null,
        registerLoading: false
    }
})

@Injectable()
export class SystemUserState {
    constructor(
        private store: Store,
        private systemUserService: SystemUserService
    ) {
    }

    @Selector()
    static registerLoading(state: SystemUserStateModel) {
        return state.registerLoading;
    }

    @Action(RegistrationRequest)
    registrationRequest(context: StateContext<SystemUserStateModel>, action: RegistrationRequest) {
        context.patchState({
            registerLoading: true
        });
        return this.systemUserService.registration(action.request).pipe(
            mergeMap(respone => this.store.dispatch(new RegistrationResponse(respone))),
            catchError(reject => this.store.dispatch(new SystemUserFail(reject)))
        );
    }

    @Action(RegistrationResponse)
    registrationResponse(context: StateContext<SystemUserStateModel>, action: RegistrationResponse) {
        context.patchState({
            user: action.response,
            registerLoading: false
        });
    }

    @Action(SystemUserFail)
    systemUserFailure(context: StateContext<SystemUserStateModel>, action: SystemUserFail) {
        context.patchState({
            registerLoading: false
        });
    }

}
