import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CreateProductPageComponent } from 'src/app/features/products/pages/create-product-page/create-product-page.component';
import { ProductDetailsComponent } from 'src/app/features/products/pages/product-details/product-details.component';
import { EditProductPageComponent } from 'src/app/features/products/pages/edit-product-page/edit-product-page.component';
import { CartComponent } from 'src/app/features/products/pages/cart/cart.component';

const routes: Routes = [
  
  { path: '', 
    component: ProductsComponent,
  
  children: [

  {
    path: '',
    component: ProductListComponent
  },

  {
    path: 'create',
    component: CreateProductPageComponent
  },

  {
    path: 'edit/:id',
    component: EditProductPageComponent
  },

  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: ':id',
    component: ProductDetailsComponent
  }

]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
