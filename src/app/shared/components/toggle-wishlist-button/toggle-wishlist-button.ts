import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthActionFacade } from '../../../core/services/auth/auth-action-facade/auth-action-facade';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  private readonly store = inject(fluxCartStore);
  readonly authActionFacade = inject(AuthActionFacade);
  product = input.required<Product>();
  isInWishList = computed(() => this.store.wishlistIds().includes(this.product().id));
}
