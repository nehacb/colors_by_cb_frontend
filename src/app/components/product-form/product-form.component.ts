import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators  
} from '@angular/forms';

import { ProductService } from 'src/app/services/product.service'; 

import { Product } from 'src/app/models/product';

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
    ]),

    imageUrl: new FormControl('', [
      Validators.required
    ]),

    artistName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),

    category: new FormControl('', [
      Validators.required
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
          price : this.initialData.price,
          imageUrl: this.initialData.imageUrl,
          artistName: this.initialData.artistName,
          description: this.initialData.description,
          category: this.initialData.category
        }
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const product: Product = {
        name: this.form.value.name!,
        price: Number(this.form.value.price),
        imageUrl: this.form.value.imageUrl!,
        artistName: this.form.value.artistName!,
        description: this.form.value.description!,
        category: this.form.value.category!
      };
      this.formSubmit.emit(product);
    }
  } 

}