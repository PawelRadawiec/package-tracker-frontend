import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Basket } from 'src/app/models/basket.model';
import { BasketService } from 'src/app/service/basket.service';
import { ModalHelperService, DialogCode } from 'src/app/service/modal-helper.service';
import { SetErrorMap } from '../error/error.actions';
import {
    AddProductToBasketRequest,
    GetBasketByOwnerRequest,
    GetBasketCountRequest,
    SetBasket,
    SetBasketCount
}
    from './baset.actions';


export interface BasketStateModel {
    count: number;
    basket: Basket;
}

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        count: 0,
        basket: null
    }
})
@Injectable()
export class BasketState {

    constructor(
        private store: Store,
        private basketService: BasketService,
        private dialogHelper: ModalHelperService
    ) {
    }

    @Selector()
    static basket(state: BasketStateModel) {
        return state.basket;
    }

    @Selector()
    static basketCount(state: BasketStateModel) {
        return state.count;
    }

    @Action(GetBasketCountRequest)
    countRequest() {
        return this.basketService.count().pipe(
            mergeMap(count => this.store.dispatch(new SetBasketCount(count)))
        )
    }

    @Action(SetBasketCount)
    countResponse(state: StateContext<BasketStateModel>, action: SetBasketCount) {
        state.patchState({
            count: action.count
        })
    }

    @Action(GetBasketByOwnerRequest)
    getBasketByOwnerRequest(state: StateContext<BasketStateModel>, action: GetBasketByOwnerRequest) {
        return this.basketService.getBasketByOwner().pipe(
            mergeMap(basket => this.store.dispatch(new SetBasket(basket, action.openModal)))
        )
    }

    @Action(SetBasket)
    setBasket(state: StateContext<BasketStateModel>, action: SetBasket) {
        const basket = action.basket;
        state.patchState({
            basket
        })
        if (action.openModal) {
            this.dialogHelper.openDialogByCode(DialogCode.BASKET, basket);
        }
    }

    @Action(AddProductToBasketRequest)
    addProductToBasketRequest(state: StateContext<BasketStateModel>, action: AddProductToBasketRequest) {
        return this.basketService.addProductToBasket(action.request).pipe(
            mergeMap(basket => this.store.dispatch(new SetBasket(basket, false))),
            catchError(reject => of(this.store.dispatch(new SetErrorMap(reject.error, reject))))
        );
    }

}