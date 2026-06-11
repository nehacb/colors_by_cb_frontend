import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule // RouterModule is imported to enable the use of routerLink in the NavbarComponent template, 
    // allowing for navigation between different routes in the application.
  ],
  exports: [    
    NavbarComponent //Export makes the component available to other modules that import CoreModule
  ]
})
export class CoreModule { }
