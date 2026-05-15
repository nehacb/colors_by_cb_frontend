import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from './product.service';

import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

private cartSubject = new BehaviorSubject<CartItem[]>([]);

cart$ = this.cartSubject.asObservable();

addToCart(product: Product) {
   
  const currentCart = this.cartSubject.value;

  const existingItem = currentCart.find(item => item.product.id === product.id);

  if(existingItem) {
    existingItem.quantity++;
    console.log('Your same item has been added to the cart again:', product);
    console.log('Current cart:', currentCart);
  }
  else {
    currentCart.push({product, quantity:1});
    console.log('Your item has been added to the cart:', product);
    console.log('Current cart:', currentCart);
  }

  this.cartSubject.next([...currentCart]);
}

}
