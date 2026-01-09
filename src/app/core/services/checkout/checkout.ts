import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartBody, SessionResponse } from '../../models/checkout/checkout';
import { environment } from '../../../../environments/environment.development';
import { UserOrder } from '../../models/orders/orders';

@Injectable({
  providedIn: 'root',
})
export class Checkout {
  private readonly httpClient = inject(HttpClient);

  checkOutSession(cartId: string | null, data: CartBody): Observable<SessionResponse> {
    return this.httpClient.post<SessionResponse>(
      `${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      data
    );
  }
  getUserOrders(userId: string): Observable<UserOrder[]> {
    return this.httpClient.get<UserOrder[]>(`${environment.baseUrl}/orders/user/${userId}`);
  }
}
