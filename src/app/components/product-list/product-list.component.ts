import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  products = [
    {
      name: 'Lenovo z300',
      category: 'PC'
    },
    {
      name: 'iphone',
      category: 'PHONE'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
