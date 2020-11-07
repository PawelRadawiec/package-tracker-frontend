
import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetErrorMap } from './error.actions';

export interface ErrorModel {
    errors: Map<string, string>;
}

@State<ErrorModel>({
    name: 'errors',
    defaults: {
        errors: new Map<string, string>()
    }
})

@Injectable()
export class ErrorState {
    constructor(
        private store: Store
    ) {
    }

    @Selector()
    static errorsMap(state: ErrorModel) {
        return state.errors;
    }

    @Action(SetErrorMap)
    setErrors(context: StateContext<ErrorModel>, action: SetErrorMap) {
        let errroMap = new Map<string, string>();
        if (action.reject.status === 401) {
            errroMap = new Map<string, string>();
            errroMap.set('401', '401 status');
        } else {
            errroMap = new Map<string, string>(action.errors);
        }
        context.patchState({
            errors: errroMap
        });
    }

}
