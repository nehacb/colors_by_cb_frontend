import { Routes } from '@angular/router';


export const routes: Routes = [


  {
    path: '',
  loadChildren: () =>
      import('./features/home/home.module')
        .then(m => m.HomeModule)
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module')
        .then(m => m.ProductsModule)
  }

];