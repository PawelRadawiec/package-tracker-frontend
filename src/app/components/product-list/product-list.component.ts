import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { AddToBasketRequest } from 'src/app/models/add-to-basket-request.model';
import { Basket } from 'src/app/models/basket.model';
import { Page } from 'src/app/models/page/page.model';
import { PaginatorOptions } from 'src/app/models/page/paginator-options.model';
import { CustomPageable, ProductSearchRequest } from 'src/app/models/page/product-search-request.model';
import { Product } from 'src/app/models/product.model';
import { AddProductToBasketRequest } from 'src/app/store/basket/baset.actions';
import { BasketState } from 'src/app/store/basket/basket.state';
import { GetOwnerProductsRequest, GetProductRequest } from 'src/app/store/product/product.actions';
import { ProductState } from 'src/app/store/product/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private basket: Basket;
  private productMode: string;
  private subscriptions: Subscription[] = [];

  page: Page;
  products: Product[] = [];
  pagintorOptions: PaginatorOptions;
  searchRequest: ProductSearchRequest;

  constructor(private store: Store) {
    this.pagintorOptions = new PaginatorOptions();
    this.searchRequest = new ProductSearchRequest();
    this.subscriptions.push(
      this.store.select(BasketState.basket).subscribe(basket => this.basket = basket),
      this.store.select(ProductState.page).subscribe(page => this.handlePageSubscribe(page)),
      this.store.select(ProductState.products).subscribe(products => this.products = products),
      this.store.select(ProductState.productMode).subscribe(productMode => this.productMode = productMode)
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  handlePageSubscribe(page: Page) {
    this.page = page;
    this.pagintorOptions.datasource = page?.content;
    this.pagintorOptions.pageIndex = page?.number;
    this.pagintorOptions.pageSize = page?.numberOfElements;
    this.pagintorOptions.length = page?.totalElements;
  }

  addToBasket(product: Product) {
    this.store.dispatch(new AddProductToBasketRequest(
      new AddToBasketRequest({
        basket: this.basket,
        product
      }))
    );
  }

  getProducts(event) {
    if (!event) {
      return;
    }
    const pageable = new CustomPageable();
    pageable.page = event.pageIndex;
    pageable.size = 6;
    if (this.searchRequest.name && this.searchRequest.name.length > 0) {
      pageable.name = this.searchRequest.name;
    }
    switch (this.productMode) {
      case 'SEARCH':
        this.store.dispatch(new GetProductRequest(pageable));
        break;
      case 'OWNER':
        this.store.dispatch(new GetOwnerProductsRequest(pageable))
    }

  }

}
