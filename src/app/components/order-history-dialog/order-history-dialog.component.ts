import { Component, OnInit, Inject } from '@angular/core';
import { OrderHistory } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-history-dialog',
  templateUrl: './order-history-dialog.component.html',
  styleUrls: ['./order-history-dialog.component.scss']
})
export class OrderHistoryDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'status', 'date'];
  orderHistory: OrderHistory[] = [];
  orderCode: string;
  subscribe: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.orderHistory = this.data.orderHistory;
  }

}
