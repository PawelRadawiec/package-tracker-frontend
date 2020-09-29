import { Injectable } from '@angular/core';
import { OrderState } from '../store/order/order.state';
import { Select } from '@ngxs/store';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  @Select(OrderState.orderErrorMap) errors$: Observable<Map<string, string>>;
  private errorsMap: Map<string, string>;
  private subscription: Subscription;

  public form: FormGroup;

  constructor() {
    this.subscription = this.errors$.subscribe(errors => this.handleErrorsSubscription(errors));
  }

  private handleErrorsSubscription(errorsMap: Map<string, string>) {
    this.errorsMap = errorsMap;
    for (const [key, value] of Object.entries(this.errorsMap)) {
      const formControl = this.form.get(key);
      if (formControl) {
        formControl.setErrors({ serverError: value });
      }
    }
  }

  hasError(field: string): boolean {
    return this.getErrorMessage(field);
  }

  getErrorMessage(field: string): boolean {
    if (!this.form) {
      return false;
    }
    return this.form.get(field).errors?.serverError;
  }

}
