import { Component, computed, inject, input } from '@angular/core';
import { CartProduct } from '../../../../core/models/cart/cart';
import { QuantitySelector } from '../../../../shared/components/quantity-selector/quantity-selector';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../../core/store/FluxCart.store';

@Component({
  selector: 'app-cart-item',
  imports: [QuantitySelector, MatIconButton, MatIcon],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  readonly store = inject(fluxCartStore);
  item = input.required<CartProduct>();
  productTotal = computed(() => this.item().price * this.item().count);
}
