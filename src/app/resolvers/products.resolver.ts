import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { GetProductRequest } from '../store/product/product.actions';
import { ProductState } from '../store/product/product.state';

@Injectable()
export class ProductsResolver implements Resolve<any>{

    constructor(private store: Store) {
        
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.store.dispatch(new GetProductRequest()).pipe(
            map(() => this.store.selectSnapshot(ProductState))
        );
    }

}