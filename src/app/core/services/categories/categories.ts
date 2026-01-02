import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../models/categories/categories';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private readonly httpClient = inject(HttpClient);

  getCategories(): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(`${environment.baseUrl}/categories`);
  }
}
