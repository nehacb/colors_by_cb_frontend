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
    
ngOnInit() {
  // Here you can add the logic to handle the checkout process, such as calling a service to process the order
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

}
