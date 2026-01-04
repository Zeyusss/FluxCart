import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserWishlistResponse, WishlistResponse } from '../../models/wishlist/wishlist';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  private readonly httpClient = inject(HttpClient);

  addProductToWishlist(productId: string): Observable<WishlistResponse> {
    return this.httpClient.post<WishlistResponse>(`${environment.baseUrl}/wishlist`, {
      productId: productId,
    });
  }
  removeProductFromWishlist(productId: string): Observable<WishlistResponse> {
    return this.httpClient.delete<WishlistResponse>(`${environment.baseUrl}/wishlist/${productId}`);
  }
  getLoggedUserWishlist(): Observable<UserWishlistResponse> {
    return this.httpClient.get<UserWishlistResponse>(`${environment.baseUrl}/wishlist`);
  }
}
