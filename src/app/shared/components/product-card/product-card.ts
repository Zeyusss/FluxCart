import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthActionFacade } from '../../../core/services/auth/auth-action-facade/auth-action-facade';
import { RouterLink } from '@angular/router';
import { StarRating } from '../star-rating/star-rating';
@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, RouterLink, StarRating],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly authActionFacade = inject(AuthActionFacade);
  product = input<Product>({} as Product);

  inStock = computed(() => (this.product().quantity > 0 ? 'In Stock' : 'Out Of Stock'));
}
