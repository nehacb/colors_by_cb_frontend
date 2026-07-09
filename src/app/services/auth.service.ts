import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();  

  isLoggedin$ = new BehaviorSubject<Boolean>(false);

  private apiUrl =
    'http://localhost:8081/api/auth';

  constructor(
    private http: HttpClient
  ) {
    this.updateAdminStatus();
  }

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  saveToken(token: string): void {

    localStorage.setItem(
      'jwt', // key that identifies the token in local storage, and setItem stores the provided value (the token) under that key, allowing the application to retrieve it later for authentication purposes.
      token
    );

    this.updateAdminStatus(); // updates the isAdminSubject based on the current role, 
    // indicating whether the user is an admin after logging in.
    this.updateLoggedInStatus(); // updates the isLoggedin$ BehaviorSubject to reflect the current login status.

  }

  getToken(): string | null {

    return localStorage.getItem(
      'jwt'
    );

  }

  logout(): void {

    localStorage.removeItem(
      'jwt' // its a key that identifies the token in local storage, and removeItem deletes it, effectively logging the user out by clearing their authentication token from the browser's storage.
    );
    this.updateAdminStatus(); // updates the isAdminSubject based on the current role, 
    // indicating that the user is no longer an admin after logging out.

    this.updateLoggedInStatus(); // updates the isLoggedin$ BehaviorSubject to reflect the current login status.
  }

  isLoggedIn(): boolean {

    return !!this.getToken(); // the double negation converts the token value into a boolean, 
    // returning true if a token exists (indicating the user is logged in) and false if it doesn't (indicating the user is not logged in).

  }

  decodeToken() : any {

    const token = this.getToken();

    if(!token) {
      return null;
    }

    const payload = token.split('.')[1]; // JWTs are typically composed of three parts separated by dots:
    //  header, payload, and signature. 
    // The payload contains the claims or data about the user, and is the second part of the token.

    const decodedPayload = atob(payload); // atob decodes a base64-encoded string back to its original representation, allowing us to read the JSON payload of the JWT.

    return JSON.parse(decodedPayload); // parse converts the JSON string into a JavaScript object, making it easier to access the claims and data contained in the JWT.

  }

  getRole() : string | null {

    const token = this.decodeToken();
    
    return token?.role || null; 
    // the optional chaining operator (?.) safely accesses the role property of the decoded token object,
    //  returning its value if it exists, or null if the token is null or doesn't have a role property.

  }

  updateAdminStatus(): void {
    this.isAdminSubject.next(this.getRole() === 'ADMIN');
  }

  isAdmin() : boolean {
    return this.getRole() === 'ADMIN';
  }

  updateLoggedInStatus(): void {
    this.isLoggedin$.next(this.isLoggedIn());
  }
  
}