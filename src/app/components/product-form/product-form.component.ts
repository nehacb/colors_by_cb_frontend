import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators  
} from '@angular/forms';

import { ProductService, Product } from 'src/app/services/product.service'; 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ])
  });

  constructor(private productService: ProductService) {}
  
@Input() initialData?: Product;

@Output() formSubmit = new EventEmitter<Product>();

  ngOnInit() {
    if (this.initialData) {
      this.form.patchValue(
        {
          name : this.initialData.name,
          price : this.initialData.price
        }
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const product: Product = {
        name: this.form.value.name!,
        price: Number(this.form.value.price)
      };
      this.formSubmit.emit(product);
    }
  } 

}