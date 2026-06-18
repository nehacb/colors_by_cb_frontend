import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [

  {
    path: '', // cant be login because the 'login' is used in app-routing.module.ts to load the LoginModule, 
    // so the path here should be empty to match the route defined in app-routing.module.ts in order to lazy load
    //  the child route for the LoginComponent.
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {

  
 }
