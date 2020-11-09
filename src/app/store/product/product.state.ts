import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Page } from 'src/app/models/page/page.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { HideSpinner } from '../spinner/spinner.actions';
import { GetOwnerProductsRequest, GetProductRequest, ProductRequestFailure, SetProducts } from './product.actions';


export class ProductStateModel {
    page: Page;
    products: Product[];
    productMode: string;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        page: null,
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
    static page(state: ProductStateModel) {
        return state.page;
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
    productsRequest(state: StateContext<ProductStateModel>, action: GetProductRequest) {
        state.patchState({
            productMode: 'SEARCH'
        })
        return this.productService.products(action.pageable).pipe(
            mergeMap(page => this.store.dispatch(new SetProducts(page))),
            catchError(reject => of(this.store.dispatch(new ProductRequestFailure(reject.error))))
        )
    }

    @Action(GetOwnerProductsRequest)
    ownerProducts(state: StateContext<ProductStateModel>, action: GetOwnerProductsRequest) {
        state.patchState({
            productMode: 'OWNER'
        })
        return this.productService.ownerProducts(action.pageable).pipe(
            mergeMap(products => this.store.dispatch(new SetProducts(products)))
        )
    }

    @Action(SetProducts)
    setProducts(state: StateContext<ProductStateModel>, action: SetProducts) {
        state.patchState({
            page: action.page,
            products: action?.page?.content
        });
        this.store.dispatch(new HideSpinner());
    }

}