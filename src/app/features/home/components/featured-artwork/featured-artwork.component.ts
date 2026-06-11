import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-artwork',
  templateUrl: './featured-artwork.component.html',
  styleUrls: ['./featured-artwork.component.css']
})
export class FeaturedArtworkComponent {

  products : Product[] = [];
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(products => {

      this.products = products;

    });
  }

}
