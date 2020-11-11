import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { CreateOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.state';
import { Observable, Subscription } from 'rxjs';
import { ErrorService } from 'src/app/service/error.service';
import { Order } from 'src/app/models/order.model';
import { ProductState } from 'src/app/store/product/product.state';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [ErrorService]
})
export class OrderFormComponent implements OnInit, OnDestroy {
  @Select(OrderState.startLoading) startLoading$: Observable<boolean>;
  private subscription: Subscription;
  private productToBuy: Product;
  orderForm: FormGroup;
  orderTypes = [
    {
      type: 'SMALL',
      typeDescription: 'Small'
    },
    {
      type: 'LARGE',
      typeDescription: 'Large'
    },
  ];
  transports = [
    {
      type: 'DHL',
      transportDescription: 'DHL'
    },
    {
      type: 'FEDEX',
      transportDescription: 'Fedex'
    },
  ];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) { }

  ngOnInit() {
    this.initOrderForm();
    this.errorService.form = this.orderForm;
    this.subscription = this.store.select(ProductState.productToBuy).subscribe(productToBuy => this.productToBuy = productToBuy);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initOrderForm() {
    this.orderForm = this.formBuilder.group({
      orderType: [''],
      transportType: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        postalCode: ['']
      })
    });
  }

  onSubmit() {
    const order = new Order(this.orderForm.value);
    order.product = this.productToBuy;
    this.store.dispatch(new CreateOrder(order));
  }

}
