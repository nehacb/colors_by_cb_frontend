import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { BehaviorSubject, switchMap } from 'rxjs';

import { ProductService, Product } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private refresh$ = new BehaviorSubject<void>(undefined);

  products$ = this.refresh$.pipe(
    switchMap(() => this.productService.getProducts())
  );

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    price: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ])
  });

  constructor(private productService: ProductService) {}

  addProduct() {

    if (this.form.invalid) return;

    const product: Product = {
      name: this.form.value.name!,
      price: Number(this.form.value.price)
    };

    this.productService.addProduct(product).subscribe(() => {

      this.refresh$.next();

      this.form.reset();
    });
  }

  deleteProduct(id: number) {

    this.productService.deleteProduct(id).subscribe(() => {

      this.refresh$.next();
    });
  }
}