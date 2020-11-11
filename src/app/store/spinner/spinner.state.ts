import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetBasketByOwnerRequest, SetBasket } from '../basket/baset.actions';
import { CreateProductRequest, CreateProductResponse, GetOwnerProductsRequest, GetProductRequest } from '../product/product.actions';
import { HideSpinner, ShowSpinner } from './spinner.actions';

export const showSpinnerActions = [
    ShowSpinner,
    GetProductRequest,
    GetOwnerProductsRequest,
    GetBasketByOwnerRequest,
    CreateProductRequest,
    GetBasketByOwnerRequest
];

export const hideSpinnerActions = [
    HideSpinner,
    CreateProductResponse,
    SetBasket
];


export interface SpinnerStateModel {
    showSpinner: boolean;
}


@State<SpinnerStateModel>({
    name: 'spinner',
    defaults: {
        showSpinner: false
    },
})
@Injectable()
export class SpinnerState {

    @Selector()
    static showSpinner(state: SpinnerStateModel) {
        return state.showSpinner;
    }

    @Action(showSpinnerActions)
    showSpinner(state: StateContext<SpinnerStateModel>) {
        state.patchState({
            showSpinner: true
        })
    }

    @Action(hideSpinnerActions)
    hideSpinner(state: StateContext<SpinnerStateModel>) {
        state.patchState({
            showSpinner: false
        })
    }

}