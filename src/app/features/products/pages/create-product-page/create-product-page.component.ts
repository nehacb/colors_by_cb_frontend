import { Component } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';
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
    .subscribe({

      next: () => {

        this.router.navigate(['/list']);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
}
