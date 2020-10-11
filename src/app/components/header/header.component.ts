import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutRequest } from 'src/app/store/authorization/authroziatoin.actions';
import { Subscription } from 'rxjs';
import { AuthorizatonState } from 'src/app/store/authorization/authorization.state';
import { SystemUserAuthorizationInfo } from 'src/app/models/login-response.model';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  authInfo: SystemUserAuthorizationInfo;
  selectedIndex: number;

  constructor(
    private store: Store,
    public tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(AuthorizatonState.systemUserAuthInfo).subscribe(
        authInfo => this.authInfo = authInfo
      )
    );
    this.setTabIndex();
  }

  logout() {
    this.store.dispatch(new LogoutRequest(this.authInfo));
  }

  private setTabIndex() {
    switch (location.pathname) {
      case '/search':
        this.selectedIndex = 0;
        break;
      case '/list':
        this.selectedIndex = 1;
        break;
      case '/order':
        this.selectedIndex = 2;
        break;
      case '/account':
        this.selectedIndex = 4;
        break;
    }
  }

}
