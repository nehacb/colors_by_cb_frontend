import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product?: Product;

  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private cartService : CartService
  ) {}

  // paramMap is an observable that emits a new value whenever the route parameters change, 
  // allowing the component to react to changes in the route and 
  // fetch the appropriate product details based on the product ID in the URL.

  // we have used switchMap to switch to a new observable returned by getProductById whenever 
  // the route parameters change,
  // ensuring that we always get the latest product details without 
  // having to manage subscriptions manually.
  
  ngOnInit(): void {
    
    this.route.paramMap
    .pipe(
      switchMap(params => {

        const id = Number(params.get('id'));

        return this.productService.getProductbyId(id);

      })
    ) .subscribe(product => {

        this.product = product;

      }); }
    


addToCart(product: Product) {

  this.cartService.addToCart(product!.id!); 
  }

}

