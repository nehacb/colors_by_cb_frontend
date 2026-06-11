import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8081/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  saveToken(token: string) {

    localStorage.setItem(
      'jwt',
      token
    );

  }

  getToken() {

    return localStorage.getItem(
      'jwt'
    );

  }

  logout() {

    localStorage.removeItem(
      'jwt'
    );

  }

  isLoggedIn() {

    return !!this.getToken();

  }
}