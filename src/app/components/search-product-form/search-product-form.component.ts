import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Basket } from 'src/app/models/basket.model';
import { ErrorService } from 'src/app/service/error.service';
import { GetBasketByOwnerRequest } from 'src/app/store/basket/baset.actions';
import { BasketState } from 'src/app/store/basket/basket.state';
import { BasketModalComponent } from '../basket-modal/basket-modal.component';

@Component({
  selector: 'app-search-product-form',
  templateUrl: './search-product-form.component.html',
  styleUrls: ['./search-product-form.component.scss'],
  providers: [ErrorService]
})
export class SearchProductFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  basket: Basket;
  productForm: FormGroup;

  categories = [
    {
      type: 'PHONE',
      typeDescription: 'Phone'
    },
    {
      type: 'PC',
      typeDescription: 'PC'
    },
  ];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) { }

  ngOnInit() {
    this.initializeSerachForm();
    this.subscription = this.store.select(BasketState.basket).subscribe(basket => this.basket = basket);
    this.errorService.form = this.productForm;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search() {
  }

  getBasket() {
    this.store.dispatch(new GetBasketByOwnerRequest(true, BasketModalComponent));
  }

  initializeSerachForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      category: ['']
    });
  }

}
