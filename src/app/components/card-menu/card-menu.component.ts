import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  list(type: string) {
    console.log('type: ', type);
    let value = '';
    switch (type) {
      case 'ORDERS':
        value = 'orders';
        break;
      case 'PRODUCTS':
        value = 'products';
    }
    this.store.dispatch(new Navigate([`/${value}`]));
  }

}
