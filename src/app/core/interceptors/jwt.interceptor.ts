import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // auth service is used to get the JWT token from local storage, 
  // instead of accessing the local storage directly because it centralizes authenticaiton and
  //prevents other parts of the application from directly interacting with local storage,
  // which can enhance security and maintainability by encapsulating token management within a dedicated service.

  constructor(private authService : AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token =this.authService.getToken(); 
    if(token) {
      console.log('Token found in local storage: ' + token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log('Outgoing request:', request);
    return next.handle(request);

  }
}
