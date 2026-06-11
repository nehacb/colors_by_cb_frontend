import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.css']
})
export class CreateProductPageComponent {

  product? : Product;

  constructor(
    private router: Router,
    private productService: ProductService) {}

  addProduct(product: Product) {
 
  this.productService.addProduct(product)
// subscribe() executes the Observable and waits asynchronously for the API response,
// then handles it with the next/error callbacks

    .subscribe({

      next: () => {

        this.router.navigate(['/products']);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
}
