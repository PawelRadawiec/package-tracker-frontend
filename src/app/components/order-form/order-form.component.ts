import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initOrderForm();
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
    console.log('orderForm: ', this.orderForm.value);
  }


}
