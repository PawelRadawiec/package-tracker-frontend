import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { GetOwnerProductsRequest, GetProductRequest, ProductRequestFailure, SetProducts } from './product.actions';


export class ProductStateModel {
    products: Product[];
    productMode: string;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: null,
        productMode: null
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

    @Selector()
    static productMode(state: ProductStateModel) {
        return state.productMode;
    }

    @Action(GetProductRequest)
    productsRequest(state: StateContext<ProductStateModel>) {
        state.patchState({
            productMode: 'SEARCH'
        })
        return this.productService.products().pipe(
            mergeMap(page => this.store.dispatch(new SetProducts(page))),
            catchError(reject => of(this.store.dispatch(new ProductRequestFailure(reject.error))))
        )
    }

    @Action(GetOwnerProductsRequest)
    ownerProducts(state: StateContext<ProductStateModel>) {
        state.patchState({
            productMode: 'OWNER'
        })
        return this.productService.ownerProducts().pipe(
            mergeMap(products => this.store.dispatch(new SetProducts(products)))
        )
    }

    @Action(SetProducts)
    setProducts(state: StateContext<ProductStateModel>, action: SetProducts) {
        state.patchState({
            products: action?.page?.content
        })
    }

}