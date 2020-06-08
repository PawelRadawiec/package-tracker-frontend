import { Component, OnInit } from '@angular/core';

export class Order {
  id: number;
  name: string;
  code: string;
  statusColor: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
