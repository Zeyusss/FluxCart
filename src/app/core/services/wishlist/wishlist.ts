import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  private readonly httpClient = inject(HttpClient);
}
