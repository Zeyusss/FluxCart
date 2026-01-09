import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductResponse, SpecificProductResponse } from '../../models/products/products';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${environment.baseUrl}/products`);
  }
  getSpecificProduct(productId: string | null): Observable<SpecificProductResponse> {
    return this.httpClient.get<SpecificProductResponse>(
      `${environment.baseUrl}/products/${productId}`
    );
  }
}
