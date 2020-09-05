import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryDialogComponent } from '../components/order-history-dialog/order-history-dialog.component';

export enum DialogCode {
  ORDER_HISTORY = 'ORDER_HISTORY'
}

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  constructor(public dialog: MatDialog) { }

  public openDialogByCode(code: DialogCode, value: any) {
    const config = {
      data: {
        orderHistory: value
      }
    };
    switch (code) {
      case DialogCode.ORDER_HISTORY:
        this.dialog.open(OrderHistoryDialogComponent, config);
        break;
      default:
        return;
    }
  }

}
