import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Page } from 'src/app/models/page/page.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { HideSpinner } from '../spinner/spinner.actions';
import { BuyProduct, CreateProductRequest, CreateProductResponse, GetOwnerProductsRequest, GetProductRequest, ProductRequestFailure, SetProducts } from './product.actions';


export class ProductStateModel {
    page: Page;
    product: Product;
    products: Product[];
    productMode: string;
    productToBuy: Product;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        page: null,
        product: null,
        products: null,
        productMode: null,
        productToBuy: null
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
    static product(state: ProductStateModel) {
        return state.product;
    }

    @Selector()
    static products(state: ProductStateModel) {
        return state.products;
    }

    @Selector()
    static productMode(state: ProductStateModel) {
        return state.productMode;
    }

    @Selector()
    static productToBuy(state: ProductStateModel) {
        return state.productToBuy;
    }

    @Action(CreateProductRequest)
    createRequest(state: StateContext<ProductStateModel>, action: CreateProductRequest) {
        return this.productService.create(action.request).pipe(
            mergeMap(response => this.store.dispatch(new CreateProductResponse(response))),
            catchError(reject => of(this.store.dispatch(new ProductRequestFailure(reject.error))))
        );
    }

    @Action(CreateProductResponse)
    createResponse(state: StateContext<ProductStateModel>, action: CreateProductResponse) {
        state.patchState({
            product: action.response
        });
        this.store.dispatch(new Navigate(['products']))
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

    @Action(BuyProduct)
    buyProduct(state: StateContext<ProductStateModel>, action: BuyProduct) {
        state.patchState({
            productToBuy: action.product
        });
        this.store.dispatch(new Navigate(['order']));
    }

}