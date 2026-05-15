import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  
  product?: Product;

  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private cartService : CartService
  ) {}

  ngOnInit() {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductbyId(id).subscribe(product => {
      this.product = product;
    });
  }


addToCart(product: Product) {

  this.cartService.addToCart(product); 
  }

}

