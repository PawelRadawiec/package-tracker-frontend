import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeSerachForm();
  }

  search() {
  }

  initializeSerachForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      category: ['']
    });
  }

}
