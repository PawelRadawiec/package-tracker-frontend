import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Basket } from 'src/app/models/basket.model';

@Component({
  selector: 'app-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.scss']
})
export class BasketModalComponent implements OnInit {
  basket: Basket;
  displayedColumns: string[] = ['name', 'code', 'description', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<BasketModalComponent>
  ) { }

  ngOnInit() {
    this.basket = this.data.basket;
  }

  delete(id: number) {
      
  }

  close() {
    this.dialog.close();
  }

}
