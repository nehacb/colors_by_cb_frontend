import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private cartService: CartService,
    private authService: AuthService
  ) {}

  cartCount$ = this.cartService.cartCount$;

  isAdmin$ = this.authService.isAdmin$;

  isLoggedIn$ = this.authService.isLoggedin$;

  logout() {
    this.authService.logout();
  }

} 
