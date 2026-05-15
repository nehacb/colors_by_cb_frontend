import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { CreateProductPageComponent } from './pages/create-product-page/create-product-page.component';
import { EditProductPageComponent } from './pages/edit-product-page/edit-product-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';

import { ProductFormComponent } from '../../components/product-form/product-form.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    CreateProductPageComponent,
    EditProductPageComponent,
    ProductDetailsComponent,
    CartComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }