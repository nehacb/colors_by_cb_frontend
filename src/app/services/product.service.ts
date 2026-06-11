import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product'; // Importing the Product interface from the models directory, 
// which defines the structure of a product object that the service will work with. 

// mapping of the product data structure that the frontend will use to interact with the backend API.
// export interface Product {
//   id?: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   artistName: string;
//   description: string;
//   category: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //observable is a stream of data that can emit multiple values over time(later).
  //it fires the http request and waits for the response, 
  // allowing the application to remain responsive while waiting for the data.
  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 

  getProductbyId(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?keyword=${keyword}`);  
  }

}