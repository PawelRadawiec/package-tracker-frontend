import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Basket } from 'src/app/models/basket.model';
import { Product } from 'src/app/models/product.model';
import { DeleteProductFromBasket } from 'src/app/store/basket/baset.actions';
import { BasketState } from 'src/app/store/basket/basket.state';
import { BuyProduct } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.scss']
})
export class BasketModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  basket: Basket;
  displayedColumns: string[] = ['name', 'code', 'description', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private dialog: MatDialogRef<BasketModalComponent>
  ) { }

  ngOnInit() {
    this.basket = this.data.basket;
    this.subscription = this.store.select(BasketState.basket).subscribe(basket => this.basket = basket);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buy(product: Product) {
    this.store.dispatch(new BuyProduct(product));
    this.close();
  }

  delete(product: Product) {
    this.store.dispatch(new DeleteProductFromBasket(this.basket.id, product))
  }

  close() {
    this.dialog.close();
  }

}
