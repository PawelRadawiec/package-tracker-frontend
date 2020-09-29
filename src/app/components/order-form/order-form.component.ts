import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { CreateOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.state';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Select(OrderState.startLoading) startLoading$: Observable<boolean>;
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
  }

  initOrderForm() {
    this.orderForm = this.formBuilder.group({
      name: [''],
      orderStartDate: [],
      orderEndDate: [],
      orderType: [''],
      transportType: [''],
      person: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        postalCode: ['']
      })
    });
  }

  onSubmit() {
    this.store.dispatch(new CreateOrder(this.orderForm.value));
  }

}
