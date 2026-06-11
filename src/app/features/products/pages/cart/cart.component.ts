import { Component } from '@angular/core';
import { exhaustMap, Subject, delay, of, finalize} from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  checkoutClick$ = new Subject<void>();

  isCheckingOut = false;

    constructor(private cartService: CartService) {}
  
    cartItems$ = this.cartService.cart$;

    cartTotal$ = this.cartService.cartTotal$;
    
ngOnInit() {
  
  // the items in the cart should be verified wrt the items in the backend and 
  // then the checkout process should be initiated, 
  // which can involve multiple steps such as payment processing, order confirmation, etc.

  this.checkoutClick$
    .pipe(

      exhaustMap(() => {

        this.isCheckingOut = true;

        console.log('Checkout Started');

        return this.fakeCheckoutApi()
          .pipe(

            //executed when the checkout observable is complete or when an error/cancelation occurs
            finalize(() => {

              this.isCheckingOut = false;

            })

          );

      })

    )
    .subscribe(() => {

      console.log('Checkout Completed');

    });

}

fakeCheckoutApi() {

  return of(true).pipe(
    delay(3000)
  );

}

removeFromCart(productId: number) {

  this.cartService.removeFromCart(productId); 
}


}
