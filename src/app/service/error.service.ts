import { Injectable } from '@angular/core';
import { OrderState } from '../store/order/order.state';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  @Select(OrderState.orderErrorMap) errors$: Observable<{ [key: string]: string; }>;
  errors: { [key: string]: string; } = {};
  subscription: Subscription;

  constructor() {
    this.subscription = this.errors$.subscribe(errors => this.errors = errors);
  }

  getErrorMessage(field: string) {
    if (!this.errors) {
      return null;
    }
    return this.errors[field];
  }

}
