import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorState } from '../store/error/error.state';


@Injectable()
export class ErrorService implements OnDestroy {
  private errorsMap: Map<string, string>;
  private subscription: Subscription;

  public form: FormGroup;

  constructor(private store: Store) {
    this.subscription = this.store.select(ErrorState.errorsMap).subscribe(errors => this.handleErrorsSubscription(errors));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleErrorsSubscription(errorsMap: Map<string, string>) {
    this.errorsMap = errorsMap;
    if (!this.form) {
      return;
    }
    for (const key of this.errorsMap.keys()) {
      const formControl = this.form.get(key);
      if (formControl) {
        formControl.setErrors({ serverError: this.errorsMap.get(key) });
      }
    }
  }

  hasStatus(status: string): boolean {
    return ![null, undefined].includes(this.errorsMap) && this.errorsMap.has(status);
  }

  hasError(field: string): boolean {
    return this.getErrorMessage(field);
  }

  getErrorMessage(field: string): boolean {
    if (!this.form) {
      return false;
    }
    return this.form.get(field)?.errors?.serverError;
  }

}
