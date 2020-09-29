import { State, Selector, Action, StateContext, Store, Actions } from '@ngxs/store';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { SigninRequest, AuthFaild, SigninResponse, LogoutRequest } from './authroziatoin.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SystemUserAuthorizationInfo } from 'src/app/models/login-response.model';
import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Navigate } from '@ngxs/router-plugin';
import * as _ from 'lodash';

export interface AuthorizationStateModel {
    systemUserAuthInfo: SystemUserAuthorizationInfo;
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
        private tokenService: TokenStorageService,
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
        const authInfo = _.cloneDeep(action.response);
        state.patchState({
            systemUserAuthInfo: authInfo
        });
        this.tokenService.saveToken(authInfo.token);
        this.store.dispatch(new Navigate(['list']));
    }

    @Action(LogoutRequest)
    logoutRequest(state: StateContext<AuthorizationStateModel>, action: LogoutRequest) {
        this.tokenService.signOut();
        window.location.reload();
    }

}
