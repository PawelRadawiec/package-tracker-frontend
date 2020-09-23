import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ofActionDispatched, Actions, Store } from '@ngxs/store';
import { SearchOrderListDebounce, SearchOrderListRequest } from 'src/app/store/order/order.actions';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { OrderListRequest } from 'src/app/models/order-list-request.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  private destory$ = new Subject<void>();
  private subscriptions: Subscription[] = [];

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
    private actions$: Actions,
    private formBuilder: FormBuilder
  ) {
    this.subscriptions.push(actions$.pipe(
      ofActionDispatched(SearchOrderListDebounce),
      map((action: SearchOrderListDebounce) => action.request),
      debounceTime(500),
      takeUntil(this.destory$)
    ).subscribe(request =>
      store.dispatch(new SearchOrderListRequest(request))
    ));
  }

  ngOnInit() {
    this.initializeSerachForm();
    this.subscriptions.push(this.searchForm.controls['name'].valueChanges.subscribe(name => {
      const request = new OrderListRequest();
      request.name = name;
      this.store.dispatch(new SearchOrderListDebounce(request));
    }));
  }

  search() {
  }

  initializeSerachForm() {
    this.searchForm = this.formBuilder.group({
      name: [''],
      code: [''],
      orderType: [''],
      transportType: [''],
      orderStartDate: [''],
      orderEndDate: ['']
    });
  }

}
