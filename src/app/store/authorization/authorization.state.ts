import { State, Selector, Action, StateContext, Store, Actions } from '@ngxs/store';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { SigninRequest, AuthFaild, SigninResponse } from './authroziatoin.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Injectable } from '@angular/core';

export interface AuthorizationStateModel {
    systemUserAuthInfo: LoginResponse;
}

@State<AuthorizationStateModel>({
    name: 'authorization',
    defaults: {
        systemUserAuthInfo: null
    }
})
@Injectable()
export class AuthorizatonState {
    constructor(
        private store: Store,
        private authorizationService: AuthorizationService
    ) {
    }

    @Selector()
    static systemUserAuthInfo(state: AuthorizationStateModel) {
        return state.systemUserAuthInfo;
    }

    @Action(SigninRequest)
    loginRequest(state: StateContext<AuthorizationStateModel>, action: SigninRequest) {
        return this.authorizationService.login(action.request).pipe(
            mergeMap(response => this.store.dispatch(new SigninResponse(response))),
            catchError((reject) => of(new AuthFaild(reject)))
        );
    }

    @Action(SigninResponse)
    loginResponse(state: StateContext<AuthorizationStateModel>, action: SigninResponse) {
        state.patchState({
            systemUserAuthInfo: action.response
        });
    }

}
