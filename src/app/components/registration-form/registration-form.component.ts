import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ErrorService } from 'src/app/service/error.service';
import { CreateOrder } from 'src/app/store/order/order.actions';
import { RegistrationRequest } from 'src/app/store/system-user/syste-user.actions';
import { SystemUserState } from 'src/app/store/system-user/system-user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Select(SystemUserState.registerLoading) registerLoading$: Observable<boolean>;

  registerForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
    this.errorService.form = this.registerForm;
  }

  initRegistrationForm() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [],
      password: []
    });
  }

  onSubmit() {
    this.store.dispatch(new RegistrationRequest(this.registerForm.value));
  }
}
