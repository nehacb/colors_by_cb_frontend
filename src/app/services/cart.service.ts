import { Injectable } from '@angular/core';

import { BehaviorSubject, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product'; 

import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // BehaviorSubject is a type of Observable that holds a value and emits it to new subscribers immediately upon subscription.
  // It also allows you to get the current value using the .value property, which is useful for managing state in Angular applications.
private cartSubject = new BehaviorSubject<CartItem[]>([]);

// asObservable makes sure that the internal state of the cart is not directly modified from outside the service,
// and it allows components to subscribe to cart$ to get updates whenever the cart changes. (Encapulation of the cart state)
// its called Shared state
cart$ = this.cartSubject.asObservable();

cartCount$ = this.cart$.pipe(

    //here the reduce function iterates over each item in the cart and 
    // accumulates the total quantity of items, starting from an initial value of 0.

    //this is the transformation of one stream (cart$) into another stream (cartCount$) 
    // that emits the total count of items in the cart whenever the cart changes and its called Derived state.
    
    map(cartItems =>

      cartItems.reduce(

        (total, item) => total + item.quantity,

        0

      )

    )

  );

cartTotal$ = this.cart$.pipe(
  
    map(cartItems =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity, 0)
      )
)

  private apiUrl = 'http://localhost:8081/api/cart';

constructor(
  private http: HttpClient
) {

  this.loadCart(); // Load the cart when the service is initialized to populate the cartSubject 
  // with the current cart data from the backend.
}

loadCart() {

  this.http
    .get<CartItem[]>(this.apiUrl)
    .subscribe(cart => {

      console.log('Cart loaded:', cart);
      this.cartSubject.next(cart);

    });

}

// addToCart(product: Product) {
   
//   const currentCart = this.cartSubject.value;

//   const existingItem = currentCart.find(item => item.product.id === product.id);

//   if(existingItem) {
//     existingItem.quantity++;
//     console.log('Your same item has been added to the cart again:', product);
//     console.log('Current cart:', currentCart);
//   }
//   else {
//     currentCart.push({product, quantity:1});
//     console.log('Your item has been added to the cart:', product);
//     console.log('Current cart:', currentCart);
//   }

//   this.cartSubject.next([...currentCart]); // Emit a new array to trigger change detection
//   //  .next is used to emit a new value to the subscribers of the cart$ observable.
//   //  By spreading the currentCart array into a new array, we ensure that Angular's change detection is triggered, 
//   // allowing any components subscribed to cart$ to update their views accordingly.
// }

addToCart(productId: number) {

  this.http
    .post(
      `${this.apiUrl}/${productId}`,
      {}
    )
    .subscribe(() => {

      this.loadCart(); // After adding an item to the cart, we call loadCart() to fetch the updated cart
      //  from the backend and update the cartSubject with the new cart data.
      //  This ensures that any components subscribed to cart$ will receive the latest cart information and 
      //  update their views accordingly.

    });

}

removeFromCart(productId: number) {

  this.http
    .delete(
      `${this.apiUrl}/${productId}`
    )
    .subscribe(() => {

      this.loadCart();

    });

}

}
