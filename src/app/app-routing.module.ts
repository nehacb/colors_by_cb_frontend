import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
  [
    { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
    { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) }, 
    { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot is used to register the main application routes, 
  // and it should only be called once in the AppRoutingModule.
  exports: [RouterModule]
})
export class AppRoutingModule { }
