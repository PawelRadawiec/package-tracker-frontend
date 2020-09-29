import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutRequest } from 'src/app/store/authorization/authroziatoin.actions';
import { Subscription } from 'rxjs';
import { AuthorizatonState } from 'src/app/store/authorization/authorization.state';
import { SystemUserAuthorizationInfo } from 'src/app/models/login-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  authInfo: SystemUserAuthorizationInfo;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(AuthorizatonState.systemUserAuthInfo).subscribe(
        authInfo => this.authInfo = authInfo
      )
    );
  }

  logout() {
    this.store.dispatch(new LogoutRequest(this.authInfo));
  }

}
