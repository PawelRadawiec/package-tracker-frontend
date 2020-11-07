import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  constructor(public dialog: MatDialog) { }

  public openDialogByCode(config: any, component: any) {
    this.dialog.open(component, config);
  }

}
