import { Component } from '@angular/core';

import{
  FormControl,
} from '@angular/forms';

import { BehaviorSubject, debounceTime, switchMap, startWith, combineLatest, map} from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/product';

import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

private refresh$ = new BehaviorSubject<void>(undefined);

isAdmin$ = this.authService.isAdmin$;

constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService) {}

searchControl = new FormControl('');
categoryControl = new FormControl('all');

//product$ is an observable that emits the list of products in future based on the search and category filters.
//product$ = this.http.get<Product[]>('/products'); --- IGNORE ---

//the product list is fetched when someone subscribes to the product$ observable, 
// and it will be re-fetched whenever the search term or category changes as per below form controls , 
// or when the refresh$ subject emits a new value (e.g., after a product is deleted).

products$ = combineLatest([ //combineLatest is used to combine multiple observables 
// and emit a new value whenever any of the input observables emit a new value.

  this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300)
  ),

  this.categoryControl.valueChanges.pipe(
    startWith('all')
  ),

  // refresh$ triggers a re-fetch whenever a product is added, deleted, or updated
  this.refresh$.asObservable()

]).pipe(

  //switchmap ignores the previous search if a new search term or category is emitted before the previous search completes,artart
  switchMap(([search, category, _]) =>

    this.productService.searchProducts(search || '')
      .pipe(

        map(products => {

          if (category === 'cheap') {

            return products.filter(
              p => p.price < 500
            );

          }

          if (category === 'premium') {

            return products.filter(
              p => p.price >= 500
            );

          }

          return products;

        })

      )

  )

);

deleteProduct(id: number) {

  this.productService.deleteProduct(id).subscribe(() => {
    this.refresh$.next();
  });   

}

addToCart(product: Product) {

  this.cartService.addToCart(product!.id!); 
  }

}
