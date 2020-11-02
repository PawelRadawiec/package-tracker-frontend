import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { GetProductRequest, GetProductResponse, ProductRequestFailure } from './product.actions';


export class ProductStateModel {
    products: Product[]
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: null
    }
})
@Injectable()
export class ProductState {

    constructor(
        private store: Store,
        private productService: ProductService
    ) {
    }

    @Selector()
    static products(state: ProductStateModel) {
        return state.products;
    }

    @Action(GetProductRequest)
    productsRequest(state: StateContext<ProductStateModel>, action: GetProductRequest) {
        return this.productService.products().pipe(
            mergeMap(page => this.store.dispatch(new GetProductResponse(page))),
            catchError(reject => of(this.store.dispatch(new ProductRequestFailure(reject.error))))
        )
    }

    @Action(GetProductResponse)
    productsResponse(state: StateContext<ProductStateModel>, action: GetProductResponse) {
        state.patchState({
            products: action?.page?.content
        })
    }

}