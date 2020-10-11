import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SigninRequest } from 'src/app/store/authorization/authroziatoin.actions';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ErrorService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.errorService.form = this.loginForm;
  }

  login() {
    this.store.dispatch(new SigninRequest(this.loginForm.value));
  }

  get displayBox() {
    return this.errorService.hasStatus('401');
  }

}
