import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetBasketByOwnerRequest } from 'src/app/store/basket/baset.actions';
import { BasketState } from 'src/app/store/basket/basket.state';

@Component({
  selector: 'app-search-product-form',
  templateUrl: './search-product-form.component.html',
  styleUrls: ['./search-product-form.component.scss']
})
export class SearchProductFormComponent implements OnInit {
  @Select(BasketState.basketCount) count$: Observable<number>;
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeSerachForm();
  }

  search() {
  }

  getBasket() {
    this.store.dispatch(new GetBasketByOwnerRequest());
  }

  initializeSerachForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      category: ['']
    });
  }

}
