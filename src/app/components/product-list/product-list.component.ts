import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { AddToBasketRequest } from 'src/app/models/add-to-basket-request.model';
import { Basket } from 'src/app/models/basket.model';
import { Product } from 'src/app/models/product.model';
import { AddProductToBasketRequest } from 'src/app/store/basket/baset.actions';
import { BasketState } from 'src/app/store/basket/basket.state';
import { ProductState } from 'src/app/store/product/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];
  private basket: Basket;
  products: Product[] = [];

  constructor(private store: Store) {
    this.subscriptions.push(
      this.store.select(ProductState.products).subscribe(
        products => this.products = products
      ),
      this.store.select(BasketState.basket).subscribe(basket => this.basket = basket)
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  addToBasket(product: Product) {
    this.store.dispatch(new AddProductToBasketRequest(
      new AddToBasketRequest({
        basket: this.basket,
        product
      }))
    );
  }

}
