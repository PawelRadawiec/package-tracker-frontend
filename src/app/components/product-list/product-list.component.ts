import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductState } from 'src/app/store/product/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private subscription: Subscription;

  products: Product[] = [];

  constructor(private store: Store) {
    this.subscription = this.store.select(ProductState.products).subscribe(
      products => this.products = products
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
