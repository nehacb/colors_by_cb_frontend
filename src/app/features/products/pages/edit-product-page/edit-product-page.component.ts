import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html'
})
export class EditProductPageComponent {

  product?: Product;

  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {

    this.productId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productService.getProductbyId(this.productId)
      .subscribe(data => {

        this.product = data;

      });

  }

  updateProduct(updated: Product) {

    this.productService.updateProduct(
      this.productId,
      updated
    ).subscribe(() => {

      this.router.navigate(['/']);

    });

  }

}