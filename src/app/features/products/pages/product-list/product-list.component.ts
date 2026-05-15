import { Component } from '@angular/core';

import{
  FormControl,
} from '@angular/forms';

import { BehaviorSubject, debounceTime, switchMap, startWith, combineLatest, map} from 'rxjs';

import { ProductService, Product } from 'src/app/services/product.service';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

private refresh$ = new BehaviorSubject<void>(undefined);

constructor(private productService: ProductService, private cartService: CartService) {}

searchControl = new FormControl('');
categoryControl = new FormControl('all');

products$ = combineLatest([

  this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300)
  ),

  this.categoryControl.valueChanges.pipe(
    startWith('all')
  )

]).pipe(

  switchMap(([search, category]) =>

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

  this.cartService.addToCart(product); 
  }

}
