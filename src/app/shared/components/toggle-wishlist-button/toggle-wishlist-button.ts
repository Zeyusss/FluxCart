import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  private readonly store = inject(fluxCartStore);
  product = input.required<Product>();
  isInWishList = computed(() => this.store.wishlistIds().includes(this.product().id));
  toggleWishList(productId: string): void {
    if (this.isInWishList()) {
      this.store.removeFromWishlist(productId);
    } else {
      this.store.addToWishlist(productId);
    }
  }
}
