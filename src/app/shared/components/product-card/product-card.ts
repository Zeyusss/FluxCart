import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, MatIconButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input<Product>({} as Product);
  private readonly store = inject(fluxCartStore);
  isInWishList = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));
  toggleWishList(): void {
    if (this.isInWishList()) {
      // remove
    } else {
      // add
    }
  }
}
