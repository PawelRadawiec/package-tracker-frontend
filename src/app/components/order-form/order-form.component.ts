import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      name: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      orderStartDate: [''],
      orderEndDate: [''],
      orderType: [''],
      transportType: ['']
    });
  }

  onSubmit() {
    console.log('order');
  }


}
