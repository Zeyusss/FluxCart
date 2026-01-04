import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../../models/cart/cart';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private readonly httpClient = inject(HttpClient);

  addProductToCart(productId: string): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(`${environment.baseUrl}/cart`, {
      productId: productId,
    });
  }

  updateCartProductQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.httpClient.put<CartResponse>(`${environment.baseUrl}/cart/${productId}`, {
      count: count,
    });
  }

  getLoggedUserCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(`${environment.baseUrl}/cart`);
  }

  removeSpecificCartItem(productId: string): Observable<CartResponse> {
    return this.httpClient.delete<CartResponse>(`${environment.baseUrl}/cart/${productId}`);
  }

  clearUserCart(): Observable<CartResponse> {
    return this.httpClient.delete<CartResponse>(`${environment.baseUrl}/cart`);
  }
}
