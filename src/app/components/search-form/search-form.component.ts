import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeSerachForm();
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
