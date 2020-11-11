import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorService } from 'src/app/service/error.service';
import { CreateProductRequest } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [ErrorService]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  categories = [
    {
      type: 'PHONE',
      typeDescription: 'Phone'
    },
    {
      type: 'PC',
      typeDescription: 'PC'
    },
    {
      type: 'HEADPHONE',
      typeDescription: 'HEADPHONE'
    }
  ];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
    this.errorService.form = this.productForm;
  }

  initRegistrationForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: ['']
    });
  }

  onSubmit() {
    this.store.dispatch(new CreateProductRequest(this.productForm.value))
  }

}
