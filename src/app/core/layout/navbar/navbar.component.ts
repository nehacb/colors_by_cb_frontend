import { Component } from '@angular/core';
import { map } from 'rxjs';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private cartService: CartService) {}

  cartCount$ = this.cartService.cartCount$;

} 
