import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { mergeMap } from 'rxjs/operators';
import { BasketService } from 'src/app/service/basket.service';
import { GetBasketCountRequest, SetBasketCount } from './baset.actions';


export interface BasketStateModel {
    count: number;
}

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        count: 0
    }
})
@Injectable()
export class BasketState {

    constructor(
        private store: Store,
        private basketService: BasketService
    ) {
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

}